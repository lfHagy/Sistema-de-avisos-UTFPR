const jsonVerifier = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON:', err.message);
      return res.status(400).json({ mensagem: 'JSON inválido', error: err.message });
    }
    next();
  };

module.exports = jsonVerifier;