CREATE TABLE IF NOT EXISTS social (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO social (github, linkedin) VALUES 
    ('https://github.com/', 'https://linkedin.com')
ON CONFLICT DO NOTHING;
