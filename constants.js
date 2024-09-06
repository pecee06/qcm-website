const env = {
  projectId: import.meta.env.VITE_PROJECT_ID,
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
  dbId: import.meta.env.VITE_DB_ID,
  quizId: import.meta.env.VITE_QUIZ_COLLECTION_ID,
  leaderboardId: import.meta.env.VITE_LEADERBOARD_COLLECTION_ID,
  userId: import.meta.env.VITE_USER_COLLECTION_ID,
  questionBucketId: import.meta.env.VITE_QUESTION_BUCKET_ID,
  teamBucketId: import.meta.env.VITE_TEAM_BUCKET_ID,
  publicBucketId: import.meta.env.VITE_PUBLIC_BUCKET_ID
}

export const timeLimits = [
  10, // in mins
  25,
  10
]

export default env
