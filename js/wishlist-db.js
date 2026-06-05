(function () {
  var WL_KEY = 'ag_wishlist_v1';
  window.WL_KEY = WL_KEY;

  var _ref = null;

  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _ref = firebase.firestore().collection('wishlist').doc('shared');
  } catch (e) {
    console.warn('[wishlist] Firebase init failed, using localStorage only');
  }

  function _localGet() {
    try { return JSON.parse(localStorage.getItem(WL_KEY)) || []; } catch (e) { return []; }
  }
  function _localSet(list) {
    localStorage.setItem(WL_KEY, JSON.stringify(list));
  }

  window.getWL    = function ()     { return _localGet(); };
  window.isWL     = function (name) { return _localGet().indexOf(name) !== -1; };

  window.saveWL   = function (list) {
    _localSet(list);
    if (_ref) {
      _ref.set({ items: list }).catch(function (e) {
        console.warn('[wishlist] Firestore write failed', e);
      });
    }
  };

  window.toggleWL = function (name) {
    var l = _localGet(), i = l.indexOf(name);
    if (i === -1) l.push(name); else l.splice(i, 1);
    window.saveWL(l);
    return l.indexOf(name) !== -1;
  };

  /* Fetch latest list from Firestore → update localStorage → call onDone */
  window.syncWLFromFirestore = function (onDone) {
    if (!_ref) { if (onDone) onDone(); return; }
    _ref.get()
      .then(function (snap) {
        if (snap.exists) _localSet(snap.data().items || []);
        if (onDone) onDone();
      })
      .catch(function (e) {
        console.warn('[wishlist] Firestore read failed, using localStorage', e);
        if (onDone) onDone();
      });
  };
})();
