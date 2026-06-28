/* ===== CISSP Book2 App ===== */

const App = (() => {
  // State
  let figureMap = {};
  let currentDomain = null;
  let currentSectionIdx = 0;
  let domainData = {};
  let searchIndex = [];
  let bookmarks = JSON.parse(localStorage.getItem('book2_bookmarks') || '[]');
  let readSections = JSON.parse(localStorage.getItem('book2_read') || '{}');
  let highlights = JSON.parse(localStorage.getItem('book2_highlights') || '[]');
  let ttsState = { active: false, paused: false, utterance: null, sectionIdx: 0, charIdx: 0 };
  let theme = localStorage.getItem('book2_theme') || 'light';
  let searchDebounce = null;

  // DOM refs (set after DOMContentLoaded)
  let els = {};

  // ===== Init =====
  function init() {
    els = {
      mainContent: document.getElementById('mainContent'),
      searchInput: document.getElementById('searchInput'),
      searchDropdown: document.getElementById('searchDropdown'),
      tocPanel: document.getElementById('tocPanel'),
      bookmarksPanel: document.getElementById('bookmarksPanel'),
      progressPanel: document.getElementById('progressPanel'),
      ttsBar: document.getElementById('ttsBar'),
      ttsPlayBtn: document.getElementById('ttsPlayBtn'),
      ttsStop: document.getElementById('ttsStop'),
      ttsSpeed: document.getElementById('ttsSpeed'),
      ttsSection: document.getElementById('ttsSectionName'),
      ttsProgressFill: document.getElementById('ttsProgressFill'),
      sidebarTabs: document.querySelectorAll('.sidebar-tab'),
      sidebarPanels: document.querySelectorAll('.sidebar-panel'),
      sidebarToggle: document.getElementById('sidebarToggle'),
      sidebar: document.getElementById('sidebar'),
      themeToggle: document.getElementById('themeToggle'),
      bookmarkCount: document.getElementById('bookmarkCount'),
    };

    applyTheme(theme);
    Promise.all([loadSearchIndex(), loadFigureMap()]).then(() => {
      const hash = window.location.hash;
      if (hash) handleHash(hash);
    });
    bindEvents();
    renderWelcome();
    renderTOC();
    renderBookmarks();
    renderProgress();

    // Hash is handled after figure map loads (see above)
  }

  // ===== Theme =====
  function applyTheme(t) {
    theme = t;
    document.documentElement.setAttribute('data-theme', t);
    if (els.themeToggle) els.themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('book2_theme', t);
  }

  // ===== Figure Map =====
  let figureMapPromise = null;
  async function loadFigureMap() {
    if (Object.keys(figureMap).length) return; // already loaded
    if (figureMapPromise) return figureMapPromise;
    figureMapPromise = fetch('data/figure-map.json')
      .then(r => r.json())
      .then(data => { figureMap = data; })
      .catch(e => console.warn('Figure map not loaded', e));
    return figureMapPromise;
  }

  // ===== Search Index =====
  async function loadSearchIndex() {
    try {
      const res = await fetch('data/search-index.json');
      searchIndex = await res.json();
    } catch (e) {
      console.warn('Search index not loaded', e);
    }
  }

  // ===== Data Loading =====
  async function loadDomain(num) {
    if (domainData[num]) return domainData[num];
    try {
      const res = await fetch(`data/domain${num}.json`);
      domainData[num] = await res.json();
      return domainData[num];
    } catch (e) {
      return null;
    }
  }

  // ===== Routing =====
  function handleHash(hash) {
    // Format: #domain1 or #domain1/section-id
    const match = hash.match(/^#domain(\d+)(?:\/(.+))?$/);
    if (match) {
      const domainNum = parseInt(match[1]);
      const sectionId = match[2] || null;
      navigateToDomain(domainNum, sectionId);
    }
  }

  function navigateToDomain(num, sectionId) {
    Promise.all([loadDomain(num), loadFigureMap()]).then(([data]) => {
      if (!data) {
        showLockedDomain(num);
        return;
      }
      currentDomain = num;
      renderDomain(data, sectionId);
      renderTOC();
      updateHash(num, sectionId);
    });
  }

  function updateHash(domainNum, sectionId) {
    const hash = sectionId ? `#domain${domainNum}/${sectionId}` : `#domain${domainNum}`;
    history.replaceState(null, '', hash);
  }

  // ===== Welcome Screen =====
  function renderWelcome() {
    const domainList = [
      { num: 1, title: 'Security and Risk Management', available: true },
      { num: 2, title: 'Asset Security', available: true },
      { num: 3, title: 'Security Architecture and Engineering', available: true },
      { num: 4, title: 'Communication and Network Security', available: true },
      { num: 5, title: 'Identity and Access Management', available: true },
      { num: 6, title: 'Security Assessment and Testing', available: true },
      { num: 7, title: 'Security Operations', available: true },
      { num: 8, title: 'Software Development Security', available: true },
    ];

    const totalRead = Object.keys(readSections).length;

    els.mainContent.innerHTML = `
      <div class="welcome-screen">
        <h1>CISSP All-in-One</h1>
        <p class="subtitle">8th Edition &middot; Interactive Study Guide &middot; ${totalRead} sections completed</p>
        <div class="domain-cards">
          ${domainList.map(d => {
            const readCount = Object.keys(readSections).filter(k => k.startsWith(`d${d.num}_`)).length;
            const progressPct = d.available ? (readCount > 0 ? Math.min(100, readCount * 5) : 0) : 0;
            return `
              <div class="domain-card ${d.available ? '' : 'locked'}"
                   onclick="${d.available ? `App.goToDomain(${d.num})` : ''}">
                <div class="domain-num">Domain ${d.num}</div>
                <h3>${d.title}</h3>
                ${d.available
                  ? `<div class="domain-stats">${readCount} sections read</div>
                     <div class="domain-progress-bar"><div class="domain-progress-fill" style="width:${progressPct}%"></div></div>`
                  : `<span class="coming-soon-badge">Coming Soon</span>`
                }
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  function showLockedDomain(num) {
    els.mainContent.innerHTML = `
      <div class="welcome-screen">
        <h1>Domain ${num}</h1>
        <p class="subtitle">This domain is coming soon. Domains 1 and 2 are available now.</p>
        <button onclick="App.goHome()" style="margin-top:20px;padding:10px 20px;background:var(--accent);color:white;border:none;border-radius:6px;cursor:pointer;">
          ← Back to Home
        </button>
      </div>`;
  }

  // ===== Domain Renderer =====
  function renderDomain(data, scrollToId) {
    stopTTS();
    const html = [];

    html.push(`
      <div class="content-area">
        <div class="chapter-header">
          <div class="chapter-domain-badge">Domain ${data.domain}</div>
          <h1 class="chapter-title">${data.title}</h1>
          <div class="chapter-meta">${data.totalSections} sections &middot; 8th Edition</div>
        </div>
    `);

    data.sections.forEach((section, idx) => {
      const readKey = `d${data.domain}_${section.id}`;
      const isRead = readSections[readKey];
      const isBookmarked = bookmarks.find(b => b.id === section.id && b.domain === data.domain);

      html.push(`
        <div class="section-block" id="sec-${section.id}" data-section-idx="${idx}">
          <${section.level === 2 ? 'h2' : 'h3'} class="${section.level === 2 ? 'section-heading' : 'subsection-heading'}">
            ${escHtml(section.title)}
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}"
                    onclick="App.toggleBookmark(${data.domain}, '${section.id}', '${escHtml(section.title)}')"
                    title="Bookmark this section">
              ${isBookmarked ? '🔖' : '☆'}
            </button>
          </${section.level === 2 ? 'h2' : 'h3'}>
          ${renderSectionContent(section.content, readKey)}
          <div class="section-read-toggle">
            <input type="checkbox" id="read-${section.id}" ${isRead ? 'checked' : ''}
                   onchange="App.toggleRead('${readKey}', '${data.domain}')">
            <label for="read-${section.id}">Mark as read</label>
            <button onclick="App.startTTS(${idx})" style="margin-left:auto;padding:4px 12px;background:var(--accent-soft);color:var(--accent);border:1px solid var(--accent);border-radius:4px;cursor:pointer;font-size:0.78rem;">
              ▶ Listen
            </button>
          </div>
        </div>
      `);
    });

    html.push('</div>');
    els.mainContent.innerHTML = html.join('');

    // Scroll to section if provided
    if (scrollToId) {
      setTimeout(() => {
        const el = document.getElementById(`sec-${scrollToId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    updateActiveTOC();
    setupScrollSpy();
  }

  function renderSectionContent(content, readKey) {
    return content.map(block => {
      if (block.type === 'paragraph') {
        return `<p class="para ${readSections[readKey] ? 'read' : ''}">${wrapWords(escHtml(block.text))}</p>`;
      }
      if (block.type === 'exam_tip') {
        return `<div class="exam-tip"><div class="exam-tip-label">Exam Tip</div><p>${wrapWords(escHtml(block.text))}</p></div>`;
      }
      if (block.type === 'note') {
        return `<div class="note-block"><p>${wrapWords(escHtml(block.text))}</p></div>`;
      }
      if (block.type === 'figure') {
        const imgFile = figureMap[block.figNum];
        const imgHtml = imgFile
          ? `<img src="/book/figures/${imgFile}" alt="Figure ${escHtml(block.figNum)}" loading="lazy" class="book-figure-real-img">`
          : `<div class="book-figure-placeholder"><span class="book-figure-label">Figure ${escHtml(block.figNum)}</span><span class="book-figure-icon">📊</span></div>`;
        return `
          <figure class="book-figure">
            ${imgHtml}
            <figcaption class="book-figure-caption">
              <strong>Figure ${escHtml(block.figNum)}</strong> — ${wrapWords(escHtml(block.caption))}
            </figcaption>
          </figure>`;
      }
      if (block.type === 'table_caption') {
        return `<div class="table-caption-block"><strong>Table ${escHtml(block.tableNum)}</strong> — ${wrapWords(escHtml(block.caption))}</div>`;
      }
      if (block.type === 'list') {
        const items = block.items.map(it => `<li>${wrapWords(escHtml(it))}</li>`).join('');
        return block.ordered
          ? `<ol class="content-list content-list-ordered">${items}</ol>`
          : `<ul class="content-list">${items}</ul>`;
      }
      if (block.type === 'quote') {
        // Last line starting with — is attribution, rest is quote text
        const lines = block.lines || [];
        const attrIdx = lines.findIndex(l => /^—/.test(l));
        const quoteLines = attrIdx >= 0 ? lines.slice(0, attrIdx) : lines;
        const attr = attrIdx >= 0 ? lines[attrIdx].replace(/^—\s*/, '') : null;
        return `<blockquote class="content-quote">
          <p>${quoteLines.map(l => wrapWords(escHtml(l))).join('<br>')}</p>
          ${attr ? `<cite>— ${wrapWords(escHtml(attr))}</cite>` : ''}
        </blockquote>`;
      }
      if (block.type === 'chapter_intro') {
        return `<p class="chapter-intro-line">${wrapWords(escHtml(block.text))}</p>`;
      }
      return '';
    }).join('');
  }

  function wrapWords(html) {
    // Wrap words in spans for TTS highlighting
    return html.replace(/(\S+)/g, '<span class="tts-word">$1</span>');
  }

  // ===== TOC =====
  // Track which domains are expanded in TOC
  let tocExpanded = {};

  function renderTOC() {
    if (!els.tocPanel) return;
    const domains = [
      { num: 1, title: 'Security and Risk Management' },
      { num: 2, title: 'Asset Security' },
      { num: 3, title: 'Security Architecture and Engineering' },
      { num: 4, title: 'Communication and Network Security' },
      { num: 5, title: 'Identity and Access Management' },
      { num: 6, title: 'Security Assessment and Testing' },
      { num: 7, title: 'Security Operations' },
      { num: 8, title: 'Software Development Security' },
    ];

    // Auto-expand current domain
    if (currentDomain) tocExpanded[currentDomain] = true;

    let html = '';
    domains.forEach(d => {
      const readCount = Object.keys(readSections).filter(k => k.startsWith(`d${d.num}_`)).length;
      const isExpanded = tocExpanded[d.num];
      const isActive = currentDomain === d.num;
      const hasSections = !!domainData[d.num];

      html += `
        <div class="toc-domain-block ${isActive ? 'toc-domain-active' : ''} ${isExpanded ? 'expanded' : ''}">
          <div class="toc-domain-header" onclick="App.toggleTOCDomain(${d.num})">
            <span class="toc-domain-arrow">▶</span>
            <span class="toc-domain-name">
              <span class="toc-domain-num">D${d.num}</span>
              ${d.title}
            </span>
            <button class="toc-open-btn" onclick="event.stopPropagation();App.goToDomain(${d.num})" title="Open domain">→</button>
          </div>
          <div class="domain-progress" style="padding:2px 16px 4px 32px">
            <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, readCount * 0.5)}%"></div></div>
          </div>`;

      if (isExpanded) {
        if (hasSections) {
          html += `<div class="toc-sections-list">`;
          domainData[d.num].sections.forEach(s => {
            const isActiveSec = document.getElementById(`toc-${s.id}`)?.classList.contains('active');
            html += `<span class="toc-section ${s.level === 3 ? 'toc-subsection' : ''}"
                           id="toc-${s.id}"
                           onclick="App.goToDomain(${d.num},'${s.id}')">${escHtml(s.title)}</span>`;
          });
          html += `</div>`;
        } else {
          html += `<div class="toc-loading">Loading sections…</div>`;
        }
      }

      html += `</div>`;
    });

    els.tocPanel.innerHTML = html;
  }

  function toggleTOCDomain(num) {
    if (tocExpanded[num]) {
      tocExpanded[num] = false;
      renderTOC();
    } else {
      tocExpanded[num] = true;
      renderTOC(); // show expanded state immediately (may show "Loading…")
      loadDomain(num).then(() => {
        if (tocExpanded[num]) renderTOC(); // re-render once data is ready
      });
    }
  }

  // ===== Bookmarks =====
  function toggleBookmark(domainNum, sectionId, title) {
    const idx = bookmarks.findIndex(b => b.id === sectionId && b.domain === domainNum);
    if (idx >= 0) {
      bookmarks.splice(idx, 1);
    } else {
      bookmarks.push({ id: sectionId, domain: domainNum, title, domainTitle: getDomainTitle(domainNum) });
    }
    localStorage.setItem('book2_bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    updateBookmarkCount();
    // Re-render current domain to update button state
    if (domainData[currentDomain]) renderDomain(domainData[currentDomain]);
  }

  function renderBookmarks() {
    if (!els.bookmarksPanel) return;
    if (bookmarks.length === 0) {
      els.bookmarksPanel.innerHTML = '<div class="empty-state">No bookmarks yet.<br>Click ☆ next to any section heading.</div>';
      return;
    }
    els.bookmarksPanel.innerHTML = bookmarks.map(b => `
      <div class="bookmark-item" onclick="App.goToDomain(${b.domain}, '${b.id}')">
        <button class="bookmark-remove" onclick="event.stopPropagation();App.toggleBookmark(${b.domain},'${b.id}','${b.title}')">✕</button>
        <div class="bookmark-item-domain">Domain ${b.domain} · ${b.domainTitle}</div>
        <div class="bookmark-item-title">${escHtml(b.title)}</div>
      </div>
    `).join('');
    updateBookmarkCount();
  }

  function updateBookmarkCount() {
    if (els.bookmarkCount) {
      els.bookmarkCount.textContent = bookmarks.length;
      els.bookmarkCount.style.display = bookmarks.length ? 'flex' : 'none';
    }
  }

  // ===== Progress =====
  function toggleRead(readKey, domainNum) {
    if (readSections[readKey]) {
      delete readSections[readKey];
    } else {
      readSections[readKey] = Date.now();
    }
    localStorage.setItem('book2_read', JSON.stringify(readSections));
    renderTOC();
    renderProgress();
  }

  function renderProgress() {
    if (!els.progressPanel) return;
    const domains = [
      { num: 1, title: 'Security and Risk Management', totalSections: 134 },
      { num: 2, title: 'Asset Security', totalSections: 61 },
      { num: 3, title: 'Security Architecture and Engineering', totalSections: 200 },
      { num: 4, title: 'Communication and Network Security', totalSections: 183 },
      { num: 5, title: 'Identity and Access Management', totalSections: 129 },
      { num: 6, title: 'Security Assessment and Testing', totalSections: 65 },
      { num: 7, title: 'Security Operations', totalSections: 142 },
      { num: 8, title: 'Software Development Security', totalSections: 153 },
    ];
    els.progressPanel.innerHTML = domains.map(d => {
      const read = Object.keys(readSections).filter(k => k.startsWith(`d${d.num}_`)).length;
      const pct = Math.round((read / d.totalSections) * 100);
      return `
        <div style="padding:12px 16px; border-bottom:1px solid var(--rule)">
          <div style="font-size:0.78rem;font-weight:600;color:var(--ink);margin-bottom:6px">Domain ${d.num}: ${d.title}</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="progress-label" style="margin-top:4px">${read}/${d.totalSections} sections · ${pct}%</div>
        </div>`;
    }).join('');
  }

  // ===== Search =====
  function handleSearch(query) {
    clearTimeout(searchDebounce);
    if (!query.trim()) {
      els.searchDropdown.classList.remove('open');
      return;
    }
    searchDebounce = setTimeout(() => {
      const q = query.toLowerCase();
      const results = searchIndex
        .filter(item => item.title.toLowerCase().includes(q) || item.fullText.toLowerCase().includes(q))
        .slice(0, 8);

      if (results.length === 0) {
        els.searchDropdown.innerHTML = `<div class="search-no-results">No results for "${escHtml(query)}"</div>`;
      } else {
        els.searchDropdown.innerHTML = results.map(r => {
          const excerpt = getExcerpt(r.fullText, q, 120);
          return `
            <div class="search-result-item" onclick="App.goToDomain(${r.domain}, '${r.id}');document.getElementById('searchInput').value='';document.getElementById('searchDropdown').classList.remove('open')">
              <div class="result-domain">Domain ${r.domain}</div>
              <div class="result-title">${highlight(escHtml(r.title), query)}</div>
              <div class="result-excerpt">${highlight(escHtml(excerpt), query)}</div>
            </div>`;
        }).join('');
      }
      els.searchDropdown.classList.add('open');
    }, 200);
  }

  function getExcerpt(text, query, maxLen) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx < 0) return text.substring(0, maxLen) + '…';
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + maxLen - 40);
    return (start > 0 ? '…' : '') + text.substring(start, end) + (end < text.length ? '…' : '');
  }

  function highlight(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  // ===== TTS =====
  function startTTS(sectionIdx) {
    if (!window.speechSynthesis) { alert('Text-to-speech is not supported in this browser.'); return; }

    stopTTS();
    const data = domainData[currentDomain];
    if (!data) return;

    const section = data.sections[sectionIdx];
    if (!section) return;

    currentSectionIdx = sectionIdx;
    const text = section.content.map(b => {
      if (b.type === 'paragraph' || b.type === 'note' || b.type === 'exam_tip' || b.type === 'chapter_intro') return b.text;
      if (b.type === 'list') return b.items.join('. ');
      if (b.type === 'quote') return b.lines.join(' ');
      if (b.type === 'figure') return `Figure ${b.figNum}. ${b.caption}.`;
      if (b.type === 'table_caption') return `Table ${b.tableNum}. ${b.caption}.`;
      return '';
    }).filter(Boolean).join(' ');
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = parseFloat(els.ttsSpeed ? els.ttsSpeed.value : 1);
    utter.lang = 'en-US';

    ttsState = { active: true, paused: false, utterance: utter, sectionIdx, text };

    utter.onstart = () => {
      els.ttsBar.classList.remove('hidden');
      els.ttsPlayBtn.textContent = '⏸';
      if (els.ttsSection) els.ttsSection.textContent = section.title;
    };

    utter.onboundary = (e) => {
      if (e.name !== 'word') return;
      highlightTTSWord(section, e.charIndex, e.charLength);
      // Update progress
      const pct = Math.round((e.charIndex / text.length) * 100);
      if (els.ttsProgressFill) els.ttsProgressFill.style.width = pct + '%';
    };

    utter.onend = () => {
      clearTTSHighlights();
      els.ttsPlayBtn.textContent = '▶';
      ttsState.active = false;
      if (els.ttsProgressFill) els.ttsProgressFill.style.width = '100%';
      // Auto-advance to next section
      if (sectionIdx + 1 < data.sections.length) {
        setTimeout(() => startTTS(sectionIdx + 1), 800);
      }
    };

    utter.onerror = () => { stopTTS(); };

    window.speechSynthesis.speak(utter);

    // Scroll section into view
    const secEl = document.getElementById(`sec-${section.id}`);
    if (secEl) secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function highlightTTSWord(section, charIndex, charLength) {
    clearTTSHighlights();
    const secEl = document.getElementById(`sec-${section.id}`);
    if (!secEl) return;
    const words = secEl.querySelectorAll('.tts-word');
    // Rebuild char offsets from the full text of the section element
    // ttsState.text is the plain-text string passed to SpeechSynthesisUtterance
    // Map each word span to a position in that string
    let pos = 0;
    let matched = null;
    for (const w of words) {
      const wText = w.textContent;
      const wLen = wText.length;
      // charIndex points to start of the spoken word in ttsState.text
      if (pos <= charIndex && charIndex < pos + wLen) {
        matched = w;
        break;
      }
      pos += wLen + 1; // +1 for the space between words
    }
    if (matched) {
      matched.classList.add('speaking');
      matched.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function clearTTSHighlights() {
    document.querySelectorAll('.tts-word.speaking').forEach(w => w.classList.remove('speaking'));
  }

  function toggleTTSPlayPause() {
    if (!ttsState.active) {
      if (domainData[currentDomain]) startTTS(currentSectionIdx);
      return;
    }
    if (ttsState.paused) {
      window.speechSynthesis.resume();
      ttsState.paused = false;
      els.ttsPlayBtn.textContent = '⏸';
    } else {
      window.speechSynthesis.pause();
      ttsState.paused = true;
      els.ttsPlayBtn.textContent = '▶';
    }
  }

  function stopTTS() {
    window.speechSynthesis && window.speechSynthesis.cancel();
    clearTTSHighlights();
    ttsState = { active: false, paused: false };
    if (els.ttsBar) els.ttsBar.classList.add('hidden');
    if (els.ttsPlayBtn) els.ttsPlayBtn.textContent = '▶';
    if (els.ttsProgressFill) els.ttsProgressFill.style.width = '0%';
  }

  // ===== Scroll Spy =====
  function setupScrollSpy() {
    const sections = document.querySelectorAll('.section-block');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id.replace('sec-', '');
          updateActiveTOC(id);
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));
  }

  function updateActiveTOC(activeId) {
    document.querySelectorAll('.toc-section, .toc-subsection').forEach(el => {
      el.classList.remove('active');
    });
    if (activeId) {
      const tocEl = document.getElementById(`toc-${activeId}`);
      if (tocEl) {
        tocEl.classList.add('active');
        tocEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  function scrollToSection(id) {
    const el = document.getElementById(`sec-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // On mobile close sidebar
      if (window.innerWidth <= 900) els.sidebar.classList.remove('open');
    }
  }

  // ===== Sidebar Tabs =====
  function switchSidebarTab(tabName) {
    els.sidebarTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    els.sidebarPanels.forEach(p => p.classList.toggle('active', p.id === tabName + 'Panel'));
  }

  // ===== Keyboard Shortcuts =====
  function bindKeyboard(e) {
    // Ignore when typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.key) {
      case '/': e.preventDefault(); els.searchInput && els.searchInput.focus(); break;
      case ' ': e.preventDefault(); toggleTTSPlayPause(); break;
      case 'Escape': stopTTS(); els.searchDropdown.classList.remove('open'); break;
      case 'ArrowRight': case 'n':
        if (currentDomain && domainData[currentDomain]) {
          const next = currentSectionIdx + 1;
          if (next < domainData[currentDomain].sections.length) scrollToSection(domainData[currentDomain].sections[next].id);
        }
        break;
      case 'ArrowLeft': case 'p':
        if (currentDomain && domainData[currentDomain]) {
          const prev = Math.max(0, currentSectionIdx - 1);
          scrollToSection(domainData[currentDomain].sections[prev].id);
        }
        break;
      case 'd': applyTheme(theme === 'dark' ? 'light' : 'dark'); break;
      case 'h': goHome(); break;
    }
  }

  // ===== Text Selection → Send to Practice =====
  let selectionPopup = null;

  function createSelectionPopup() {
    const el = document.createElement('div');
    el.id = 'book2-selection-popup';
    el.innerHTML = `
      <button id="book2-send-practice-btn" title="Send to Practice">
        📗 Send to Practice
      </button>
    `;
    document.body.appendChild(el);
    document.getElementById('book2-send-practice-btn').addEventListener('click', () => {
      sendSelectionToPractice();
    });
    selectionPopup = el;
  }

  function showSelectionPopup(x, y) {
    if (!selectionPopup) createSelectionPopup();
    selectionPopup.style.left = x + 'px';
    selectionPopup.style.top = y + 'px';
    selectionPopup.classList.add('visible');
  }

  function hideSelectionPopup() {
    if (selectionPopup) selectionPopup.classList.remove('visible');
  }

  function handleTextSelection() {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';
    if (!text || text.length < 2 || text.length > 300) {
      hideSelectionPopup();
      return;
    }
    // Only show inside main content
    if (!sel.anchorNode || !els.mainContent.contains(sel.anchorNode)) {
      hideSelectionPopup();
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left + window.scrollX + rect.width / 2 - 80;
    const y = rect.top + window.scrollY - 48;
    showSelectionPopup(Math.max(8, x), Math.max(8, y));
  }

  async function sendSelectionToPractice() {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';
    if (!text) return;

    const btn = document.getElementById('book2-send-practice-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Figure out current section title
    let sectionTitle = '';
    if (currentDomain && domainData[currentDomain]) {
      const sec = domainData[currentDomain].sections[currentSectionIdx];
      if (sec) sectionTitle = sec.title;
    }

    try {
      const res = await fetch('/api/book2/send-to-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: text,
          type: text.includes(' ') ? 'sentence' : 'word',
          domain: currentDomain,
          sectionTitle,
          domainTitle: getDomainTitle(currentDomain),
        }),
      });
      if (res.ok) {
        btn.textContent = '✓ Added!';
        setTimeout(() => {
          hideSelectionPopup();
          btn.textContent = '📗 Send to Practice';
          btn.disabled = false;
        }, 1200);
      } else {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }

    window.getSelection()?.removeAllRanges();
  }

  // ===== Bind Events =====
  function bindEvents() {
    // Search
    if (els.searchInput) {
      els.searchInput.addEventListener('input', e => handleSearch(e.target.value));
      els.searchInput.addEventListener('keydown', e => {
        if (e.key === 'Escape') { els.searchDropdown.classList.remove('open'); els.searchInput.value = ''; }
      });
    }

    // Click outside search closes dropdown
    document.addEventListener('click', e => {
      if (!e.target.closest('.header-search')) {
        els.searchDropdown && els.searchDropdown.classList.remove('open');
      }
    });

    // Sidebar tabs
    els.sidebarTabs.forEach(tab => {
      tab.addEventListener('click', () => switchSidebarTab(tab.dataset.tab));
    });

    // TTS controls
    if (els.ttsPlayBtn) els.ttsPlayBtn.addEventListener('click', toggleTTSPlayPause);
    if (els.ttsStop) els.ttsStop.addEventListener('click', stopTTS);
    if (els.ttsSpeed) els.ttsSpeed.addEventListener('change', e => {
      if (ttsState.utterance) ttsState.utterance.rate = parseFloat(e.target.value);
    });

    // Theme toggle
    if (els.themeToggle) els.themeToggle.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

    // Sidebar mobile toggle
    if (els.sidebarToggle) els.sidebarToggle.addEventListener('click', () => els.sidebar.classList.toggle('open'));

    // Keyboard shortcuts
    document.addEventListener('keydown', bindKeyboard);

    // Hash change
    window.addEventListener('hashchange', () => handleHash(window.location.hash));

    // Text selection popup
    document.addEventListener('mouseup', () => setTimeout(handleTextSelection, 10));
    document.addEventListener('touchend', () => setTimeout(handleTextSelection, 10));
    document.addEventListener('mousedown', e => {
      if (selectionPopup && !selectionPopup.contains(e.target)) hideSelectionPopup();
    });
  }

  // ===== Helpers =====
  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function getDomainTitle(num) {
    const titles = {
      1: 'Security and Risk Management',
      2: 'Asset Security',
      3: 'Security Architecture and Engineering',
      4: 'Communication and Network Security',
      5: 'Identity and Access Management',
      6: 'Security Assessment and Testing',
      7: 'Security Operations',
      8: 'Software Development Security',
    };
    return titles[num] || `Domain ${num}`;
  }

  // ===== Public API =====
  return {
    init,
    goHome: () => { currentDomain = null; renderWelcome(); renderTOC(); history.replaceState(null, '', window.location.pathname); },
    goToDomain: (num, sectionId) => navigateToDomain(num, sectionId || null),
    toggleBookmark,
    toggleRead,
    startTTS,
    scrollToSection,
    switchSidebarTab,
    toggleTOCDomain,
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
