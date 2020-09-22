import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '2m', target: 1 }, // below normal load
    { duration: '5m', target: 1 },
    { duration: '2m', target: 10 }, // normal load
    { duration: '5m', target: 10 },
    { duration: '2m', target: 100 }, // around the breaking point
    { duration: '5m', target: 100 },
    { duration: '2m', target: 1000 }, // beyond the breaking point
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 } // scale down. Recovery stage.
  ]
};

export default function () {
  const res = http.get(
    `http://127.0.0.1:3000/product?itemID=${Math.ceil(Math.random() * 1000 + 9999100)}`
  );
  check(res, {
    'is status 200': (r) => r.status === 200
  });
  sleep(1);
}
