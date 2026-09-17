import React from 'react';
import { AlertOctagon, RotateCcw, AlertCircle, ArrowLeft } from 'lucide-react';
import { ValidationResult } from '../types';

interface ErrorScreenProps {
  validation: ValidationResult;
  onReEntry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  validation,
  onReEntry
}) => {
  return (
    <div id="missing-input-error-screen" className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-sm my-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <AlertOctagon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-200 text-rose-800">
              Execution Halted
            </span>
            <span className="text-xs font-mono text-rose-600">Error State: Critical Schema Fields Missing</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Input Validation Layer Failed
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            In compliance with the <strong className="text-slate-800">Input Schema Validation</strong> specifications, processing has been immediately halted. High-accuracy multi-domain career mapping requires all critical academic and interest metrics before Tree of Thoughts (ToT) branch generation can occur.
          </p>

          {/* Missing Fields Box */}
          <div className="mt-4 p-4 rounded-xl bg-white border border-rose-200/90 shadow-2xs">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              Missing or Invalid Schema Fields:
            </h3>
            <ul className="space-y-1.5">
              {validation.missingFields.map((field, idx) => {
                const isCritical =
                  field.includes("10th") ||
                  field.includes("12th") ||
                  field.includes("Interests") ||
                  field.includes("Education");
                return (
                  <li key={idx} className="text-xs flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    <span className={`font-medium ${isCritical ? 'text-rose-900 font-semibold' : 'text-slate-700'}`}>
                      {field}
                    </span>
                    {isCritical && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                        CRITICAL
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
              <strong>Validation Notes:</strong> {validation.validationNotes}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              id="prompt-re-entry-btn"
              onClick={onReEntry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Prompt Re-entry (Fix Incomplete Inputs)</span>
            </button>
            <span className="text-xs text-slate-500">
              Correct the highlighted missing inputs to resume execution.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
