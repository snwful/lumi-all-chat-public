
import React from 'react';
import { AIMode } from '../types';
import { SparklesIcon, BoltIcon, LightBulbIcon, PencilSquareIcon } from '../constants';
import Button from './Button';

interface AIAssistControlsProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
  aiSuggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  isGenerating?: boolean;
}

const AIAssistControls: React.FC<AIAssistControlsProps> = ({
  currentMode,
  onModeChange,
  aiSuggestions,
  onSelectSuggestion,
  isGenerating
}) => {
  const modes = [
    { mode: AIMode.Manual, label: 'ตอบเอง', icon: <PencilSquareIcon className="w-4 h-4 mr-1" /> },
    { mode: AIMode.SemiAuto, label: 'AI ช่วยร่าง', icon: <LightBulbIcon className="w-4 h-4 mr-1" /> },
    { mode: AIMode.Auto, label: 'AI ตอบอัตโนมัติ', icon: <BoltIcon className="w-4 h-4 mr-1" /> },
  ];

  return (
    <div className="bg-brand-accent-soft p-3 border-t border-brand-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-sm font-medium text-brand-accent">
          <SparklesIcon className="w-5 h-5 mr-2" />
          AI Assistant Mode:
        </div>
        <div className="flex space-x-1">
          {modes.map(({ mode, label, icon }) => (
            <Button
              key={mode}
              size="sm"
              variant={currentMode === mode ? 'primary' : 'ghost'}
              onClick={() => onModeChange(mode)}
              title={label}
              className="px-2 py-1"
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {currentMode === AIMode.SemiAuto && aiSuggestions && aiSuggestions.length > 0 && !isGenerating && (
        <div className="mt-2 space-y-1">
          <p className="text-xs text-brand-secondary mb-1">AI Suggestions:</p>
          {aiSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full text-left justify-start !text-brand-primary !border-slate-300 hover:!bg-slate-100"
              onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
            >
              {suggestion.length > 60 ? suggestion.substring(0, 60) + "..." : suggestion}
            </Button>
          ))}
        </div>
      )}
      {isGenerating && (
          <div className="text-sm text-brand-secondary flex items-center justify-center p-2">
            <svg className="animate-spin mr-2 h-4 w-4 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AI is thinking...
          </div>
        )}
    </div>
  );
};

export default AIAssistControls;
