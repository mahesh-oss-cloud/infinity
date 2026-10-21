import React, { useState, useEffect } from 'react';
import { BookfaceHeader } from './BookfaceHeader';
import { ForumFeed } from './ForumFeed';
import { FounderDirectory } from './FounderDirectory';
import { ResourceVault } from './ResourceVault';
import { FounderProfileView } from './FounderProfileView';
import { NewPostModal } from './NewPostModal';
import { BookfaceMobileNav } from './BookfaceMobileNav';
import { FORUM_THREADS, CURRENT_FOUNDER_USER } from '../../data/bookfaceData';
import { playPaymentSuccessChime } from '../../utils/audio';

export const BookfaceApp = ({ onSwitchToTreasury }) => {
  const [activeSubView, setActiveSubView] = useState('forum'); // 'forum' | 'directory' | 'vault' | 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // Threads state with persistence
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('bookface_threads_v1');
    return saved ? JSON.parse(saved) : FORUM_THREADS;
  });

  useEffect(() => {
    localStorage.setItem('bookface_threads_v1', JSON.stringify(threads));
  }, [threads]);

  // Upvote handler
  const handleUpvote = (threadId) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, upvotes: t.upvotes + 1 };
      }
      return t;
    }));
  };

  // Add reply handler
  const handleAddReply = (threadId, content) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      author: {
        name: CURRENT_FOUNDER_USER.name,
        company: CURRENT_FOUNDER_USER.company,
        batch: CURRENT_FOUNDER_USER.batch,
        avatar: CURRENT_FOUNDER_USER.avatar,
        isCurrentUser: true,
      },
      content,
      upvotes: 1,
      createdAt: 'Just now',
    };

    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, replies: [...t.replies, newReply] };
      }
      return t;
    }));

    playPaymentSuccessChime();
  };

  // Add new post handler
  const handleCreatePost = (newThread) => {
    setThreads(prev => [newThread, ...prev]);
    setActiveSubView('forum');
    setActiveCategory('all');
    playPaymentSuccessChime();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col font-waldenburg pb-24 lg:pb-12">
      
      {/* Bookface Header */}
      <BookfaceHeader
        activeSubView={activeSubView}
        setActiveSubView={setActiveSubView}
        onOpenNewPost={() => setIsNewPostOpen(true)}
        onSwitchToTreasury={onSwitchToTreasury}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex-1">
        
        {/* Sub-view router */}
        {activeSubView === 'forum' && (
          <ForumFeed
            threads={threads}
            onUpvoteThread={handleUpvote}
            onAddReply={handleAddReply}
            onOpenNewPost={() => setIsNewPostOpen(true)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
          />
        )}

        {activeSubView === 'directory' && (
          <FounderDirectory
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeSubView === 'vault' && (
          <ResourceVault />
        )}

        {activeSubView === 'profile' && (
          <FounderProfileView
            onSwitchToTreasury={onSwitchToTreasury}
          />
        )}

      </main>

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSubmitPost={handleCreatePost}
      />

      {/* Mobile Bottom Navigation Dock */}
      <BookfaceMobileNav
        activeSubView={activeSubView}
        setActiveSubView={setActiveSubView}
        onOpenNewPost={() => setIsNewPostOpen(true)}
        onSwitchToTreasury={onSwitchToTreasury}
      />

    </div>
  );
};
