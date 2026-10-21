import React, { useState } from 'react';
import { X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { CURRENT_FOUNDER_USER, BOOKFACE_CATEGORIES } from '../../data/bookfaceData';

export const NewPostModal = ({ isOpen, onClose, onSubmitPost }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('fundraising');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newThread = {
      id: `thr-${Date.now()}`,
      category,
      title: title.trim(),
      content: content.trim(),
      author: {
        name: CURRENT_FOUNDER_USER.name,
        company: CURRENT_FOUNDER_USER.company,
        batch: CURRENT_FOUNDER_USER.batch,
        avatar: CURRENT_FOUNDER_USER.avatar,
        isCurrentUser: true,
      },
      upvotes: 1,
      createdAt: 'Just now',
      pinned: false,
      tags: tags.length ? tags : ['YC W27', category.toUpperCase()],
      replies: [],
    };

    onSubmitPost(newThread);
    onClose();
    setTitle('');
    setContent('');
    setTagInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-gray-200 font-waldenburg overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FB651E] text-white flex items-center justify-center p-1.5 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-2xl font-normal text-gray-950 font-instrument">
                Ask the YC Collective Brain
              </h3>
              <span className="text-[11px] text-gray-500">
                Posted as <strong>{CURRENT_FOUNDER_USER.name}</strong> • {CURRENT_FOUNDER_USER.company} (W27)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
          
          {/* Category Dropdown */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
              Topic / Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BOOKFACE_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`py-2 px-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer truncate ${
                    category === cat.id
                      ? 'border-gray-950 bg-gray-950 text-white font-medium'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Question Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How to structure intercompany service fees under RBI without withholding tax?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-2xl border border-gray-300 text-sm font-instrument focus:outline-none focus:border-gray-900 bg-white"
            />
          </div>

          {/* Content Description */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Context & Specific Dilemma
            </label>
            <textarea
              required
              rows={5}
              placeholder="Provide exact context. Mention your stage, current numbers, what you have tried, and specific advice you need from founders who have done it..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-2xl border border-gray-300 text-xs font-waldenburg focus:outline-none focus:border-gray-900 resize-none bg-white leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Delaware C-Corp, SAFE, Cross-Border, Pricing"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-waldenburg focus:outline-none focus:border-gray-900 bg-white"
            />
          </div>

          {/* Confidential Notice */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              All discussions are strictly confidential within YC founders & partners. Never quote or screenshot outside of Bookface.
            </span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#FB651E] hover:bg-[#e05514] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Bookface</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
