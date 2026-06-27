// ===== Sidebar nav: expand/collapse domains, highlight current page =====
document.addEventListener('DOMContentLoaded', function () {
  var domains = document.querySelectorAll('.nav-domain');
  domains.forEach(function (d) {
    d.addEventListener('click', function () {
      var sections = d.nextElementSibling;
      if (sections) sections.classList.toggle('open');
    });
  });

  // auto-expand and highlight current chapter based on body data attribute
  var currentChapter = document.body.getAttribute('data-chapter');
  if (currentChapter) {
    var activeDomain = document.querySelector('.nav-domain[data-chapter="' + currentChapter + '"]');
    if (activeDomain) {
      activeDomain.classList.add('active');
      var sections = activeDomain.nextElementSibling;
      if (sections) sections.classList.add('open');
    }
    var currentAnchor = window.location.hash.replace('#', '');
    if (currentAnchor) {
      var link = document.querySelector('.nav-sections a[href="#' + currentAnchor + '"]');
      if (link) link.classList.add('current');
    }
  }

  var mobileToggle = document.getElementById('mobileNavToggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      document.querySelector('.sidebar').classList.toggle('collapsed');
    });
  }
});

// ===== Search =====
var SEARCH_INDEX = null;
var SEARCH_BASE = (document.body.getAttribute('data-base') || '');

function loadSearchIndex(cb) {
  if (SEARCH_INDEX) { cb(SEARCH_INDEX); return; }
  fetch(SEARCH_BASE + 'assets/search_index.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { SEARCH_INDEX = data; cb(data); })
    .catch(function (err) { console.error('Search index failed to load', err); });
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(text, query) {
  var escaped = escapeHtml(text);
  var terms = query.trim().split(/\s+/).filter(Boolean).map(function (t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  });
  if (!terms.length) return escaped;
  var re = new RegExp('(' + terms.join('|') + ')', 'ig');
  return escaped.replace(re, '<mark>$1</mark>');
}

function scoreEntry(entry, queryLower, terms) {
  var hayHeading = entry.heading.toLowerCase();
  var hayText = entry.text.toLowerCase();
  var score = 0;
  if (hayHeading === queryLower) score += 100;
  terms.forEach(function (t) {
    if (hayHeading.indexOf(t) !== -1) score += 8;
    if (hayText.indexOf(t) !== -1) score += 2;
  });
  return score;
}

function runSearch(query) {
  var resultsEl = document.getElementById('searchResults');
  if (!resultsEl) return;
  query = query.trim();
  if (query.length < 2) {
    resultsEl.classList.remove('show');
    resultsEl.innerHTML = '';
    return;
  }
  loadSearchIndex(function (index) {
    var queryLower = query.toLowerCase();
    var terms = queryLower.split(/\s+/).filter(Boolean);
    var scored = index
      .map(function (entry) { return { entry: entry, score: scoreEntry(entry, queryLower, terms) }; })
      .filter(function (s) { return s.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 25);

    if (!scored.length) {
      resultsEl.innerHTML = '<div class="sr-empty">No matches for "' + escapeHtml(query) + '"</div>';
      resultsEl.classList.add('show');
      return;
    }

    resultsEl.innerHTML = scored.map(function (s) {
      var e = s.entry;
      var href = SEARCH_BASE + 'chapters/' + e.chapter + '.html#' + e.anchor;
      return '<a class="search-result-item" href="' + href + '">' +
        '<div class="sr-chapter">' + escapeHtml(e.chapterTitle) + '</div>' +
        '<div class="sr-heading">' + highlight(e.heading, query) + '</div>' +
        '<div class="sr-snippet">' + highlight(e.text.slice(0, 160), query) + (e.text.length > 160 ? '…' : '') + '</div>' +
        '</a>';
    }).join('');
    resultsEl.classList.add('show');
  });
}

// ===== Text-to-Speech Reader =====
(function () {
  if (!window.speechSynthesis) return;

  var synth    = window.speechSynthesis;
  var chunks   = [];   // array of { el, text }
  var current  = -1;
  var utterance = null;
  var playing  = false;
  var rate     = 1;

  // ── Build the floating player bar ──────────────────────────────────────
  var bar = document.createElement('div');
  bar.id  = 'tts-bar';
  bar.innerHTML =
    '<button id="tts-play" title="Play / Pause">&#9654;</button>' +
    '<button id="tts-stop" title="Stop">&#9632;</button>' +
    '<span id="tts-label">Read aloud</span>' +
    '<label for="tts-speed" style="font-size:0.75rem;color:#8d9bb5">Speed</label>' +
    '<select id="tts-speed">' +
      '<option value="0.75">0.75×</option>' +
      '<option value="1" selected>1×</option>' +
      '<option value="1.25">1.25×</option>' +
      '<option value="1.5">1.5×</option>' +
      '<option value="2">2×</option>' +
    '</select>' +
    '<label for="tts-voice" style="font-size:0.75rem;color:#8d9bb5">Voice</label>' +
    '<select id="tts-voice" style="max-width:140px"></select>';
  document.body.appendChild(bar);

  var btnPlay   = document.getElementById('tts-play');
  var btnStop   = document.getElementById('tts-stop');
  var selSpeed  = document.getElementById('tts-speed');
  var selVoice  = document.getElementById('tts-voice');
  var labelEl   = document.getElementById('tts-label');

  // ── Populate voice list ─────────────────────────────────────────────────
  function populateVoices() {
    var voices = synth.getVoices().filter(function (v) { return v.lang.startsWith('en'); });
    if (!voices.length) voices = synth.getVoices();
    selVoice.innerHTML = voices.map(function (v, i) {
      return '<option value="' + i + '">' + v.name + '</option>';
    }).join('');
  }
  populateVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = populateVoices;

  // ── Collect readable content elements ───────────────────────────────────
  function buildChunks() {
    chunks = [];
    var main = document.querySelector('.content-wrap') || document.querySelector('main') || document.body;
    var els  = main.querySelectorAll('h1,h2,h3,h4,p,li,.callout p');
    els.forEach(function (el) {
      var text = el.innerText.trim();
      if (text.length > 2) chunks.push({ el: el, text: text });
    });
  }

  // ── Highlight / unhighlight ─────────────────────────────────────────────
  function highlight(idx) {
    chunks.forEach(function (c) { c.el.classList.remove('tts-active'); });
    if (idx >= 0 && idx < chunks.length) {
      chunks[idx].el.classList.add('tts-active');
      chunks[idx].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ── Speak one chunk ─────────────────────────────────────────────────────
  function speakChunk(idx) {
    if (idx >= chunks.length) { stop(); return; }
    current = idx;
    highlight(idx);

    var voices = synth.getVoices().filter(function (v) { return v.lang.startsWith('en'); });
    if (!voices.length) voices = synth.getVoices();
    var voiceIdx = parseInt(selVoice.value) || 0;

    utterance            = new SpeechSynthesisUtterance(chunks[idx].text);
    utterance.rate       = rate;
    utterance.voice      = voices[voiceIdx] || null;
    utterance.onend      = function () { if (playing) speakChunk(idx + 1); };
    utterance.onerror    = function () { if (playing) speakChunk(idx + 1); };
    synth.speak(utterance);

    labelEl.textContent = (idx + 1) + ' / ' + chunks.length;
  }

  // ── Controls ────────────────────────────────────────────────────────────
  function play() {
    if (playing) {
      synth.pause();
      playing = false;
      btnPlay.innerHTML = '&#9654;';
      bar.classList.remove('tts-playing');
      return;
    }
    playing = true;
    btnPlay.innerHTML = '&#10074;&#10074;';
    bar.classList.add('tts-playing');

    if (synth.paused && utterance) {
      synth.resume();
    } else {
      buildChunks();
      speakChunk(current < 0 ? 0 : current);
    }
  }

  function stop() {
    playing  = false;
    current  = -1;
    utterance = null;
    synth.cancel();
    btnPlay.innerHTML = '&#9654;';
    bar.classList.remove('tts-playing');
    labelEl.textContent = 'Read aloud';
    chunks.forEach(function (c) { c.el.classList.remove('tts-active'); });
  }

  btnPlay.addEventListener('click', play);
  btnStop.addEventListener('click', stop);

  selSpeed.addEventListener('change', function () {
    rate = parseFloat(selSpeed.value);
    if (playing && utterance) {
      var idx = current;
      synth.cancel();
      setTimeout(function () { speakChunk(idx); }, 50);
    }
  });

  // Stop when navigating away
  window.addEventListener('beforeunload', function () { synth.cancel(); });
})();

// ===== Search =====
document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('searchInput');
  if (!input) return;
  var debounceTimer;
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    var val = input.value;
    debounceTimer = setTimeout(function () { runSearch(val); }, 80);
  });
  input.addEventListener('focus', function () {
    if (input.value.trim().length >= 2) runSearch(input.value);
  });
  document.addEventListener('click', function (e) {
    var resultsEl = document.getElementById('searchResults');
    if (!resultsEl) return;
    if (!resultsEl.contains(e.target) && e.target !== input) {
      resultsEl.classList.remove('show');
    }
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { input.blur(); document.getElementById('searchResults').classList.remove('show'); }
  });
});
