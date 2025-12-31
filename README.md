# Calculator API - Cloudflare Worker

A full-featured, blazing-fast calculator API powered by Cloudflare Workers.
Supports complex math expressions, statistics functions, aggregate operations, and trigonometry - all via simple URL query parameters.

---

## Quick Start

Send a GET request with your math expression to the `/` endpoint using the `eval` query parameter.

**Example:**

```bash
curl "https://calc.pixly.sh/?eval=sum(2,3*sqrt(16))"
```

Response:

```json
{
	"result": 14
}
```

---

## Supported Features

- Basic arithmetic: `+`, `-` (use sum() for addition & subtraction), `*`, `/`, `%`, `^` (power)
- Aggregate functions:

  - `sum(...)` - sum of numbers
  - `avg(...)` - average
  - `percentage(a, b)` - `(a / b) * 100`
  - `percentage_of(percent, value)` - `(percent / 100) * value`
  - `min(...)`, `max(...)`
  - `median(...)`, `mode(...)`, `range(...)`
  - `stddev(...)` - standard deviation
  - `variance(...)`

- Factorials: `!`
- Trigonometric functions: `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`
- Logarithmic and exponential: `log()`, `ln()`, `exp()`
- Rounding: `ceil()`, `floor()`, `round()`
- Absolute and power: `abs()`, `pow()`
- Square root: `sqrt()`
- Constants: `pi`, `e`

---

## Usage Examples

| Expression                        | Result            |
| --------------------------------- | ----------------- |
| `sum(2,3*sqrt(16))`               | 14                |
| `sum(1,2,3,4)`                    | 10                |
| `sum(avg(10,20,30),sin(pi/2))`    | 21                |
| `percentage(50,200)`              | 25                |
| `stddev(10,12,23,23,16,23,21,16)` | 4.898979485566356 |
| `factorial(5)` (or `5!`)          | 120               |
| `log(100)`                        | 2                 |

---

## Error Handling

If the expression is missing or invalid, you’ll get a JSON error response:

```json
{
	"error": "Invalid expression",
	"details": "undefined variable: abg"
}
```

Make sure your expressions use supported functions and syntax.

---

## API Reference

- **Endpoint:** `GET https://calc.pixly.sh/`
- **Query parameter:** `eval` (string) - math expression to evaluate

---

## Tips

- Use `pi` and `e` constants freely, e.g., `sin(pi / 4)`
- Functions support variable numbers of arguments: `sum(1, 2, 3, 4, 5)`
- Use parentheses to control precedence: `sum(1, 2, (3 * 4))`

---

## Planned Features

- POST support for batch calculations
- Rate limiting & API keys
- History and logging per user/IP
- Extended function set on demand
