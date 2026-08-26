import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import "./App.css";

const App = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Prêt');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [updatingEngine, setUpdatingEngine] = useState(false);

  useEffect(() => {
    const autoUpdate = async () => {
      setUpdatingEngine(true);
      setStatus('Vérification des mises à jour du moteur...');
      try {
        await invoke('mettre_a_jour_moteur');
        setStatus('Moteur à jour. Prêt à télécharger !');
      }
      catch (error) { setStatus('Prêt (impossible de vérifier les mises à jour)'); } 
      finally { setUpdatingEngine(false); }
    };

    autoUpdate();
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setStatus('Téléchargement et fusion de la vidéo en cours (cela peut prendre un moment)...');

    try {
      const result = await invoke('telecharger_video', { urlInput: url });
      setStatus(`Succès : ${result}`);
      setIsFinished(true);
    }
    catch (error) { setStatus(`Erreur : ${error}`); }
    finally { setIsLoading(false); }
  };

  const handleReset = () => {
    setUrl('');
    setIsFinished(false);
    setStatus('Prêt');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 p-4 rounded-full shadow-lg shadow-red-600/30">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-white animate-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 tracking-tight">YT Downloader Pro</h1>
        <p className="text-slate-400 text-sm mb-6">Téléchargez vos vidéos en Haute Qualité pour vos montages</p>

        {!isFinished ? (
          <form onSubmit={handleDownload} className="space-y-4">
            <input
              type="url"
              placeholder="Collez le lien YouTube ici..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading || updatingEngine}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-all text-sm"
              required
            />

            <button
              type="submit"
              disabled={isLoading || updatingEngine || !url}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 text-white font-medium rounded-xl shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all disabled:pointer-events-none text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Téléchargement en cours...
                </>
              ) : (
                'Lancer le téléchargement'
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all text-sm"
            >
              ✨ Nouveau téléchargement
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isLoading || updatingEngine ? 'bg-amber-500 animate-ping' : isFinished ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
          <p className="text-xs text-slate-400 font-mono max-w-full truncate">{status}</p>
        </div>
      </div>
    </div>
  );
}

export default App;