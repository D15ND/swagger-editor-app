'use client';

import { Avatar, Card, Label } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';

import styles from './about.module.css';

type Technology = {
  name: string;
};

type TeamMember = {
  name: string;
  roleKey: 'teamLead' | 'developer';
  github: string;
  avatarUrl: string;
};

const technologies: Technology[] = [
  { name: 'Next.js' },
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'Gravity UI' },
  { name: 'Vitest' },
  { name: 'next-i18next' },
  { name: 'ESLint' },
  { name: 'Prettier' },
];

const teamMembers: TeamMember[] = [
  {
    name: 'D15ND',
    roleKey: 'teamLead',
    github: 'D15ND',
    avatarUrl: 'https://github.com/D15ND.png',
  },
  {
    name: 'self-destructed',
    roleKey: 'developer',
    github: 'self-destructed',
    avatarUrl: 'https://github.com/self-destructed.png',
  },
  {
    name: 'fayzullo05',
    roleKey: 'developer',
    github: 'fayzullo05',
    avatarUrl: 'https://github.com/fayzullo05.png',
  },
];

export default function AboutPage() {
  const { t } = useT('about');

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <Label theme="info" size="m">
          {t('badge')}
        </Label>

        <h1>{t('title')}</h1>

        <p>{t('subtitle')}</p>
      </section>

      <section className={styles.infoGrid} aria-label="Project information">
        <Card className={styles.card}>
          <h2>{t('rsSchool.title')}</h2>

          <p>{t('rsSchool.description')}</p>

          <a className={styles.link} href="https://rs.school/" target="_blank" rel="noreferrer">
            {t('rsSchool.link')}
            <span aria-hidden="true">↗</span>
          </a>
        </Card>

        <Card className={styles.card}>
          <h2>{t('technologies.title')}</h2>

          <p>{t('technologies.description')}</p>

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
        <h2>{t('team.title')}</h2>

        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <article key={member.github} className={styles.memberCard}>
              <Avatar
                imgUrl={member.avatarUrl}
                text={getInitials(member.name)}
                size="xl"
                className={styles.avatar}
              />

              <h3>{member.name}</h3>

              <p>{t(`team.roles.${member.roleKey}`)}</p>

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

function getInitials(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
}
