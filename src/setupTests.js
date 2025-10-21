// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Silencia los warnings verbosos de React Router sobre "Future Flags" en pruebas.
// Son solo informativos y no afectan la ejecución de tests.
// Nota: En React 18 + StrictMode los efectos se montan 2 veces en dev,
// lo que puede duplicar estos warnings.
const originalWarn = console.warn;
jest.spyOn(console, 'warn').mockImplementation((...args) => {
	const [first] = args;
	if (typeof first === 'string' && first.includes('React Router Future Flag Warning')) {
		return; // ignora estos mensajes en tests
	}
	originalWarn(...args);
});
