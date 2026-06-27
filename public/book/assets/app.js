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
