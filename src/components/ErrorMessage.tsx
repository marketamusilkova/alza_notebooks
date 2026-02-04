import React from "react";

interface ErrorMessageProps {
  error: string | null;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className='py-20 flex flex-col items-center animate-in zoom-in-95 duration-500'>
      <div className='w-24 h-24 bg-red-50 text-alza-red rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100'>
        <i className='fas fa-plug-circle-xmark text-4xl'></i>
      </div>
      <h2 className='text-2xl font-bold text-gray-900 mb-2 text-center'>
        Ups! Něco se nepovedlo spojit.
      </h2>
      <p className='text-gray-500 text-center max-w-md mb-8 leading-relaxed'>
        Omlouváme se, ale nepodařilo se nám načíst aktuální nabídku notebooků.
        Zkuste prosím zkontrolovat své internetové připojení nebo stránku obnovit.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <button
          onClick={onRetry}
          className='px-10 py-3 bg-alza-blue text-white font-bold rounded-lg hover:bg-alza-blueDark transition-all shadow-lg shadow-alza-blue/20 active:scale-95'>
          <i className='fas fa-arrows-rotate mr-2'></i>
          Zkusit znovu
        </button>
        <button
          onClick={() => window.location.reload()}
          className='px-10 py-3 bg-white text-gray-700 font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-all active:scale-95'>
          Obnovit stránku
        </button>
      </div>
      <details className='mt-12 text-center'>
        <summary className='text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition-colors uppercase tracking-widest list-none'>
          Zobrazit technické detaily
        </summary>
        <p className='mt-2 text-[10px] font-mono text-gray-400 bg-white p-2 rounded border border-gray-100'>
          {error}
        </p>
      </details>
    </div>
  );
};

export default ErrorMessage;