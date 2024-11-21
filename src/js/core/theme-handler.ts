import { themeVariants, type ThemeVariants } from '../constants/theme';

const themeToggle = document.querySelector(
  '#theme-toggle'
) as HTMLInputElement | null;

const setTheme = (theme: ThemeVariants) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme =
    currentTheme === 'dark' ? themeVariants.LIGHT : themeVariants.DARK;
  setTheme(newTheme);
};

document.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  const currentTheme =
    savedTheme === themeVariants.DARK || savedTheme === themeVariants.LIGHT
      ? savedTheme
      : prefersDark
      ? themeVariants.DARK
      : themeVariants.LIGHT;

  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
    themeToggle.checked = currentTheme === themeVariants.LIGHT;
  } else {
    console.warn('Theme toggler not found');
  }
});
