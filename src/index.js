import { Parser } from 'expr-eval';

const parser = new Parser();

Object.assign(parser.functions, {
	sum: (...args) => args.reduce((a, b) => a + b, 0),
	avg: (...args) => args.reduce((a, b) => a + b, 0) / args.length,
	percentage: (a, b) => (a / b) * 100,
	percentage_of: (percent, value) => (percent / 100) * value,
	min: Math.min,
	max: Math.max,
	median: (...args) => {
		const sorted = args.slice().sort((a, b) => a - b);
		const mid = Math.floor(sorted.length / 2);
		return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
	},
	mode: (...args) => {
		const freq = {};
		args.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
		const maxFreq = Math.max(...Object.values(freq));
		return Number(Object.keys(freq).find((k) => freq[k] === maxFreq));
	},
	range: (...args) => Math.max(...args) - Math.min(...args),
	stddev: (...args) => {
		const avg = args.reduce((a, b) => a + b, 0) / args.length;
		return Math.sqrt(args.reduce((sum, val) => sum + (val - avg) ** 2, 0) / args.length);
	},
	variance: (...args) => {
		const avg = args.reduce((a, b) => a + b, 0) / args.length;
		return args.reduce((sum, val) => sum + (val - avg) ** 2, 0) / args.length;
	},
	sqrt: Math.sqrt,
	pow: Math.pow,
	abs: Math.abs,
	ceil: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	exp: Math.exp,
	log: Math.log10,
	ln: Math.log,
	sin: Math.sin,
	cos: Math.cos,
	tan: Math.tan,
	asin: Math.asin,
	acos: Math.acos,
	atan: Math.atan,
});

// Constants
Object.assign(parser.consts, {
	pi: Math.PI,
	e: Math.E,
});

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const expr = url.searchParams.get('eval') || url.searchParams.get('expr');

		if (!expr) {
			return new Response(JSON.stringify({ error: 'Missing expression. Use ?eval=' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		try {
			const result = parser.evaluate(expr);
			return new Response(JSON.stringify({ result }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (err) {
			return new Response(
				JSON.stringify({
					error: 'Invalid expression',
					details: err.message,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
	},
};
