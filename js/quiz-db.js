(function () {
  var LB_KEY = 'ag_quiz_scores_v1';
  var _ref = null;

  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _ref = firebase.firestore().collection('leaderboards').doc('quiz');
  } catch (e) {
    console.warn('[quiz-db] Firebase init failed, using localStorage only');
  }

  function localGet() {
    try { return JSON.parse(localStorage.getItem(LB_KEY) || '[]'); } catch (e) { return []; }
  }
  function localSet(data) {
    localStorage.setItem(LB_KEY, JSON.stringify(data));
  }
  function sortAndTrim(arr) {
    arr.sort(function (a, b) { return b.score - a.score || new Date(b.date) - new Date(a.date); });
    if (arr.length > 50) arr.length = 50;
    return arr;
  }

  window.quizDB = {
    /* Append entry, persist to Firestore, call cb(updatedScores) */
    save: function (entry, cb) {
      window.quizDB.load(function (current) {
        current.push(entry);
        sortAndTrim(current);
        localSet(current);
        if (_ref) {
          _ref.set({ entries: current }).catch(function (e) {
            console.warn('[quiz-db] write failed', e);
          });
        }
        if (cb) cb(current);
      });
    },

    /* Load scores: Firestore first, localStorage fallback */
    load: function (cb) {
      if (_ref) {
        _ref.get()
          .then(function (snap) {
            var entries = snap.exists ? (snap.data().entries || []) : [];
            localSet(entries);
            if (cb) cb(entries);
          })
          .catch(function (e) {
            console.warn('[quiz-db] read failed, using localStorage', e);
            if (cb) cb(localGet());
          });
      } else {
        if (cb) cb(localGet());
      }
    }
  };
})();
