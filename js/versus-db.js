(function () {
  var _ref = null;

  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _ref = firebase.firestore().collection('leaderboards').doc('versus');
  } catch (e) {
    console.warn('[versus-db] Firebase init failed, using localStorage only');
  }

  window.versusDB = {
    /* Overwrite votes document in Firestore */
    saveVotes: function (votes, cb) {
      if (_ref) {
        _ref.set({ votes: votes })
          .then(function () { if (cb) cb(); })
          .catch(function (e) {
            console.warn('[versus-db] write failed', e);
            if (cb) cb();
          });
      } else {
        if (cb) cb();
      }
    },

    /* Fetch votes from Firestore, fallback to empty object */
    loadVotes: function (cb) {
      if (_ref) {
        _ref.get()
          .then(function (snap) {
            var votes = snap.exists ? (snap.data().votes || {}) : {};
            if (cb) cb(votes);
          })
          .catch(function (e) {
            console.warn('[versus-db] read failed', e);
            if (cb) cb({});
          });
      } else {
        if (cb) cb({});
      }
    }
  };
})();
