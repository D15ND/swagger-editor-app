'use client';
import { Avatar, Card, Label } from '@gravity-ui/uikit';

import styles from './about.module.css';

type Technology = {
  name: string;
};

type TeamMember = {
  name: string;
  role: string;
  github: string;
};

const technologies: Technology[] = [
  { name: 'Next.js' },
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'Gravity UI' },
  { name: 'Vitest' },
  { name: 'next-intl' },
  { name: 'ESLint' },
  { name: 'Prettier' },
];

const teamMembers: TeamMember[] = [
  {
    name: 'D15ND',
    role: 'Team Lead',
    github: 'D15ND',
  },
  {
    name: 'self-destructed',
    role: 'Developer',
    github: 'self-destructed',
  },
  {
    name: 'fayzullo05',
    role: 'Developer',
    github: 'fayzullo05',
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <h1>About the Project</h1>

        <p>
          A Swagger/OpenAPI Viewer and Editor built as a final project for the
          RS School React Course.
        </p>
      </section>

      <section className={styles.infoGrid}>
        <Card className={styles.card}>
          <h2>RS School</h2>

          <p>
            This application is created as part of the RS School curriculum.
            RS School is a free, community-based education program conducted by
            The Rolling Scopes developer community.
          </p>

          <a
            className={styles.link}
            href="https://rs.school/"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about RS School
            <span aria-hidden="true">↗</span>
          </a>
        </Card>

        <Card className={styles.card}>
          <h2>Technologies</h2>

          <div className={styles.tags}>
            {technologies.map((technology) => (
              <Label key={technology.name} theme="info" size="m">
                {technology.name}
              </Label>
            ))}
          </div>
        </Card>
      </section>

      <section className={styles.teamCard}>
        <h2>Our Team</h2>

        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <article key={member.github} className={styles.memberCard}>
              <Avatar
                text={getInitials(member.name)}
                size="xl"
                className={styles.avatar}
              />

              <h3>{member.name}</h3>

              <p>{member.role}</p>

              <a
                className={styles.githubLink}
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noreferrer"
              >
                @{member.github}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function getInitials(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
}