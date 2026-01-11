-- attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  photo_url TEXT,
  recognition_status TEXT NOT NULL DEFAULT 'pending',
  device_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for retention clean-up
CREATE INDEX IF NOT EXISTS attendance_created_at_idx ON attendance(created_at);
