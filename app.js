import { hourlyCost, meetingCost, clock } from './calculator.js';
const $ = id => document.getElementById(id);
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const number = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const fields = ['internal-rate', 'internal-count', 'consultant-rate', 'consultant-count'];
let state = 'idle', accumulated = 0, startedAt = 0;
function config() { const [internalRate, internalCount, consultantRate, consultantCount] = fields.map(id => Number($(id).value)); return { internalRate, internalCount, consultantRate, consultantCount }; }
function elapsed() { return accumulated + (state === 'running' ? Math.max(0, performance.now() - startedAt) : 0); }
function render() {
  const c = config(), rate = hourlyCost(c), participants = c.internalCount + c.consultantCount, ms = elapsed();
  $('hourly-cost').textContent = euros.format(rate);
  const parts = euros.formatToParts(meetingCost(rate, ms));
  $('total-cost').replaceChildren(...parts.map(part => { if (part.type !== 'currency') return document.createTextNode(part.value); const span = document.createElement('span'); span.textContent = part.value; return span; }));
  $('elapsed').textContent = clock(ms);
  $('collective').textContent = number.format(ms / 60000 * participants) + ' min';
  $('participant-summary').textContent = `${participants} participant${participants > 1 ? 's' : ''} mobilisé${participants > 1 ? 's' : ''}`;
  $('estimate').textContent = euros.format(rate / 2);
}
function setState(next) {
  state = next;
  const labels = { idle: 'Prête à démarrer', running: 'Réunion en cours', paused: 'En pause', finished: 'Réunion terminée' };
  $('status').replaceChildren(Object.assign(document.createElement('i')), document.createTextNode(labels[state]));
  $('status').classList.toggle('running', state === 'running');
  $('settings-fields').disabled = state !== 'idle';
  $('start-button').disabled = state !== 'idle';
  $('controls').hidden = !['running', 'paused'].includes(state);
  $('new-button').hidden = state !== 'finished';
  $('pause-button').textContent = state === 'paused' ? '▶ Reprendre' : 'Ⅱ Mettre en pause';
  $('cost-caption').textContent = { idle: 'Un petit compteur pour une grande prise de conscience.', running: 'Le coût évolue en temps réel, chaque seconde compte.', paused: 'Le compteur est suspendu. Prenez le temps de souffler.', finished: 'Voici le temps et le budget investis dans cette réunion.' }[state];
  render();
}
$('settings-form').addEventListener('submit', e => {
  e.preventDefault();
  if (state !== 'idle') return;
  const c = config();
  if (fields.some(id => !$(id).checkValidity()) || c.internalCount + c.consultantCount < 1) {
    $('form-error').textContent = 'Ajoutez au moins un participant et saisissez des valeurs valides.'; return;
  }
  $('form-error').textContent = ''; accumulated = 0; startedAt = performance.now(); setState('running');
});
$('pause-button').addEventListener('click', () => {
  if (state === 'running') { accumulated = elapsed(); setState('paused'); }
  else if (state === 'paused') { startedAt = performance.now(); setState('running'); }
});
$('finish-button').addEventListener('click', () => { accumulated = elapsed(); setState('finished'); });
$('new-button').addEventListener('click', () => { accumulated = 0; setState('idle'); });
fields.forEach(id => $(id).addEventListener('input', () => { $('form-error').textContent = ''; render(); }));
window.addEventListener('beforeunload', e => { if (['running', 'paused'].includes(state)) { e.preventDefault(); e.returnValue = ''; } });
document.addEventListener('visibilitychange', render);
setInterval(() => { if (state === 'running') render(); }, 100);
render();
