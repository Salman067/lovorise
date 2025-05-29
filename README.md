-- Insert sample users--


INSERT INTO users (id, name, email, gender, hearts, country, avatar, is_active, is_premium, joined_date, last_active, created_at, updated_at) VALUES
('usr_001', 'Alice Johnson', 'alice@example.com', 'female', 1250, 'United States', 'https://example.com/avatars/alice.jpg', true, true, NOW() - INTERVAL '6 months', NOW() - INTERVAL '2 hours', NOW(), NOW()),
('usr_002', 'Bob Smith', 'bob@example.com', 'male', 890, 'United Kingdom', 'https://example.com/avatars/bob.jpg', true, false, NOW() - INTERVAL '4 months', NOW() - INTERVAL '1 hour', NOW(), NOW()),
('usr_003', 'Carol Davis', 'carol@example.com', 'female', 1100, 'Canada', 'https://example.com/avatars/carol.jpg', true, true, NOW() - INTERVAL '8 months', NOW() - INTERVAL '30 minutes', NOW(), NOW()),
('usr_004', 'David Wilson', 'david@example.com', 'male', 750, 'Australia', 'https://example.com/avatars/david.jpg', true, false, NOW() - INTERVAL '3 months', NOW() - INTERVAL '3 hours', NOW(), NOW()),
('usr_005', 'Emma Brown', 'emma@example.com', 'female', 980, 'Germany', 'https://example.com/avatars/emma.jpg', true, true, NOW() - INTERVAL '5 months', NOW() - INTERVAL '1 hour', NOW(), NOW()),
('usr_006', 'Frank Miller', 'frank@example.com', 'male', 650, 'France', 'https://example.com/avatars/frank.jpg', false, false, NOW() - INTERVAL '7 months', NOW() - INTERVAL '2 days', NOW(), NOW()),
('usr_007', 'Grace Lee', 'grace@example.com', 'female', 1400, 'Japan', 'https://example.com/avatars/grace.jpg', true, true, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 hour', NOW(), NOW()),
('usr_008', 'Henry Taylor', 'henry@example.com', 'male', 820, 'Brazil', 'https://example.com/avatars/henry.jpg', true, false, NOW() - INTERVAL '2 months', NOW() - INTERVAL '4 hours', NOW(), NOW()),
('usr_009', 'Ivy Chen', 'ivy@example.com', 'female', 1050, 'Singapore', 'https://example.com/avatars/ivy.jpg', true, true, NOW() - INTERVAL '9 months', NOW() - INTERVAL '2 hours', NOW(), NOW()),
('usr_010', 'Jack Anderson', 'jack@example.com', 'male', 920, 'Netherlands', 'https://example.com/avatars/jack.jpg', true, false, NOW() - INTERVAL '6 months', NOW() - INTERVAL '1 hour', NOW(), NOW());

-- Insert sample revenue data---


INSERT INTO revenues (amount, type, user_id, date, created_at, updated_at) VALUES
(9.99, 'subscription', 'usr_001', NOW() - INTERVAL '1 day', NOW(), NOW()),
(4.99, 'in-app-purchase', 'usr_002', NOW() - INTERVAL '2 days', NOW(), NOW()),
(19.99, 'subscription', 'usr_003', NOW() - INTERVAL '3 days', NOW(), NOW()),
(2.99, 'in-app-purchase', 'usr_004', NOW() - INTERVAL '4 days', NOW(), NOW()),
(9.99, 'subscription', 'usr_005', NOW() - INTERVAL '5 days', NOW(), NOW()),
(14.99, 'subscription', 'usr_007', NOW() - INTERVAL '6 days', NOW(), NOW()),
(1.99, 'in-app-purchase', 'usr_008', NOW() - INTERVAL '7 days', NOW(), NOW()),
(9.99, 'subscription', 'usr_009', NOW() - INTERVAL '8 days', NOW(), NOW()),
(3.99, 'in-app-purchase', 'usr_010', NOW() - INTERVAL '9 days', NOW(), NOW()),
(19.99, 'subscription', 'usr_001', NOW() - INTERVAL '1 month', NOW(), NOW()),
(9.99, 'subscription', 'usr_003', NOW() - INTERVAL '1 month', NOW(), NOW()),
(4.99, 'in-app-purchase', 'usr_005', NOW() - INTERVAL '1 month', NOW(), NOW());

-- Insert sample engagement data---


INSERT INTO engagements (module, usage_count, engagement_score, date, created_at, updated_at) VALUES
('Swipes', 15420, 8.5, NOW() - INTERVAL '1 day', NOW(), NOW()),
('Events', 9870, 7.2, NOW() - INTERVAL '1 day', NOW(), NOW()),
('Reels', 8230, 9.1, NOW() - INTERVAL '1 day', NOW(), NOW()),
('Chat', 6890, 8.8, NOW() - INTERVAL '1 day', NOW(), NOW()),
('Others', 3650, 6.5, NOW() - INTERVAL '1 day', NOW(), NOW()),
('Swipes', 14200, 8.3, NOW() - INTERVAL '2 days', NOW(), NOW()),
('Events', 9200, 7.1, NOW() - INTERVAL '2 days', NOW(), NOW()),
('Reels', 7800, 9.0, NOW() - INTERVAL '2 days', NOW(), NOW()),
('Chat', 6200, 8.6, NOW() - INTERVAL '2 days', NOW(), NOW()),
('Others', 3100, 6.2, NOW() - INTERVAL '2 days', NOW(), NOW());

-- Insert sample user activities---


INSERT INTO user_activities (user_id, activity_type, module, score, timestamp) VALUES
('usr_001', 'swipe', 'Swipes', 5, NOW() - INTERVAL '1 hour'),
('usr_001', 'message', 'Chat', 3, NOW() - INTERVAL '2 hours'),
('usr_002', 'view', 'Reels', 2, NOW() - INTERVAL '30 minutes'),
('usr_003', 'attend', 'Events', 10, NOW() - INTERVAL '3 hours'),
('usr_004', 'swipe', 'Swipes', 5, NOW() - INTERVAL '4 hours'),
('usr_005', 'message', 'Chat', 3, NOW() - INTERVAL '1 hour'),
('usr_007', 'view', 'Reels', 2, NOW() - INTERVAL '2 hours'),
('usr_008', 'swipe', 'Swipes', 5, NOW() - INTERVAL '5 hours'),
('usr_009', 'attend', 'Events', 10, NOW() - INTERVAL '1 hour'),
('usr_010', 'message', 'Chat', 3, NOW() - INTERVAL '3 hours');
