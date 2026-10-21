import React, { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Pin, 
  Share2, 
  Sparkles, 
  Send, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  CornerDownRight 
} from 'lucide-react';
import { BOOKFACE_CATEGORIES } from '../../data/bookfaceData';

export const ForumFeed = ({ 
  threads, 
  onUpvoteThread, 
  onAddReply, 
  onOpenNewPost, 
  activeCategory, 
  setActiveCategory,
  searchQuery 
}) => {
  const [expandedThreadId, setExpandedThreadId] = useState('thr-1');
  const [replyText, setReplyText] = useState({});

  // Filter threads by category and search
  const filteredThreads = threads.filter(thr => {
    const matchesCategory = activeCategory === 'all' || thr.category === activeCategory;
    const matchesSearch = !searchQuery || 
      thr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thr.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thr.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSendReply = (threadId) => {
    const text = replyText[threadId];
    if (!text || !text.trim()) return;
    onAddReply(threadId, text.trim());
    setReplyText(prev => ({ ...prev, [threadId]: '' }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Prompt to ask the Collective Brain */}
      <div className="p-5 rounded-3xl bg-white border border-gray-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6600]" />
            <h2 className="text-2xl font-normal text-gray-950 font-instrument">
              The Collective Brain of Y Combinator
            </h2>
          </div>
          <p className="text-xs text-gray-600 font-waldenburg mt-1 max-w-xl leading-relaxed">
            Every question posted here reaches thousands of YC founders and partners. High signal, zero noise. Search battle-tested playbooks or ask a question directly.
          </p>
        </div>

        <button
          onClick={onOpenNewPost}
          className="shrink-0 py-2.5 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-semibold font-waldenburg shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ff6600]" />
          <span>Post a Question</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-waldenburg text-xs">
        {BOOKFACE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                isActive
                  ? 'bg-gray-950 text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Thread Feed List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-500 font-waldenburg">
            <p className="text-sm">No discussions found matching your filter.</p>
          </div>
        ) : (
          filteredThreads.map((thr) => {
            const isExpanded = expandedThreadId === thr.id;

            return (
              <div 
                key={thr.id}
                className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-all hover:border-gray-300"
              >
                {/* Header row: Author & Metadata */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={thr.author.avatar}
                      alt={thr.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-950 font-waldenburg">
                          {thr.author.name}
                        </span>
                        <span className="text-xs text-gray-500 font-waldenburg">
                          • {thr.author.company}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#ff6600]/10 text-[#d95300] font-bold font-waldenburg border border-[#ff6600]/20">
                          {thr.author.batch}
                        </span>
                        {thr.pinned && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-bold font-waldenburg">
                            <Pin className="w-2.5 h-2.5" /> Pinned
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400 font-waldenburg block">
                        {thr.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Upvote button */}
                  <button
                    onClick={() => onUpvoteThread(thr.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs font-semibold transition-all cursor-pointer group active:scale-95"
                    title="Upvote / Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#ff6600] transition-colors" />
                    <span className="font-instrument text-sm">{thr.upvotes}</span>
                  </button>
                </div>

                {/* Thread Title in Instrument Serif */}
                <h3 
                  onClick={() => setExpandedThreadId(isExpanded ? null : thr.id)}
                  className="text-xl sm:text-2xl font-normal text-gray-950 font-instrument tracking-tight hover:text-[#d95300] transition-colors cursor-pointer mb-2.5"
                >
                  {thr.title}
                </h3>

                {/* Thread Content */}
                <p className="text-sm text-gray-700 font-waldenburg leading-relaxed mb-4">
                  {thr.content}
                </p>

                {/* Tags row */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4 font-waldenburg">
                  {thr.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Thread Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 font-waldenburg text-xs text-gray-600">
                  <button
                    onClick={() => setExpandedThreadId(isExpanded ? null : thr.id)}
                    className="flex items-center gap-1.5 hover:text-gray-950 font-semibold cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span>{thr.replies.length} Founder Replies</span>
                  </button>

                  <button
                    onClick={() => setExpandedThreadId(thr.id)}
                    className="text-xs text-[#d95300] font-semibold hover:underline cursor-pointer"
                  >
                    {isExpanded ? 'Hide Discussion' : 'View Full Advice & Replies →'}
                  </button>
                </div>

                {/* Expanded Replies & Comment Box */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-4">
                    
                    {/* List of Replies */}
                    {thr.replies.map((rep) => (
                      <div 
                        key={rep.id}
                        className={`p-4 rounded-2xl border text-xs font-waldenburg space-y-2 ${
                          rep.author.verifiedYcPartner
                            ? 'bg-amber-50/50 border-amber-200'
                            : 'bg-gray-50/80 border-gray-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={rep.author.avatar}
                              alt={rep.author.name}
                              className="w-7 h-7 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-gray-950">
                                  {rep.author.name}
                                </span>
                                <span className="text-gray-500">• {rep.author.company}</span>
                                {rep.author.verifiedYcPartner && (
                                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#FB651E] text-white font-bold tracking-tight">
                                    YC Partner
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-gray-400 block">{rep.createdAt}</span>
                            </div>
                          </div>

                          <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3 text-gray-400" />
                            <span className="font-instrument text-xs">{rep.upvotes}</span>
                          </span>
                        </div>

                        <p className="text-gray-800 leading-relaxed pl-9">
                          {rep.content}
                        </p>
                      </div>
                    ))}

                    {/* Quick Reply Form */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Contribute advice or share what worked for you..."
                        value={replyText[thr.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [thr.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendReply(thr.id);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-xs font-waldenburg focus:outline-none focus:border-gray-900 bg-white"
                      />
                      <button
                        onClick={() => handleSendReply(thr.id)}
                        className="p-2.5 rounded-xl bg-gray-950 text-white hover:bg-black transition-colors cursor-pointer"
                        title="Send Reply"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
