import React, { Suspense } from 'react';

const FeedApp = React.lazy(() => import('newsfeed/FeedApp'));

export default function NewsFeedMFE() {
  return (
    <Suspense fallback={<div>Loading feed...</div>}>
      <FeedApp />
    </Suspense>
  );
}
