'use client';

import { Avatar, Card, Label, Link, Text } from '@gravity-ui/uikit';
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

        <Text as="h1">{t('title')}</Text>

        <Text>{t('subtitle')}</Text>
      </section>

      <section className={styles.infoGrid} aria-label="Project information">
        <Card className={styles.card}>
          <Text as="h2">{t('rsSchool.title')}</Text>

          <Text>{t('rsSchool.description')}</Text>

          <Link className={styles.link} href="https://rs.school/" target="_blank" rel="noreferrer">
            {t('rsSchool.link')}
            <Text as="span" aria-hidden="true">
              ↗
            </Text>
          </Link>
        </Card>

        <Card className={styles.card}>
          <Text as="h2">{t('technologies.title')}</Text>

          <Text>{t('technologies.description')}</Text>

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
        <Text as="h2">{t('team.title')}</Text>

        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <article key={member.github} className={styles.memberCard}>
              <Avatar
                imgUrl={member.avatarUrl}
                text={getInitials(member.name)}
                size="xl"
                className={styles.avatar}
              />

              <Text as="h3">{member.name}</Text>

              <Text>{t(`team.roles.${member.roleKey}`)}</Text>

              <Link
                className={styles.githubLink}
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noreferrer"
              >
                @{member.github}
              </Link>
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
