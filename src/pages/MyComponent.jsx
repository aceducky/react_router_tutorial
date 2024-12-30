import { Suspense } from "react";
import { useLoaderData, Await } from "react-router";

export default function MyComponent() {
  const { criticalData, nonCriticalData } = useLoaderData();

  return (
    <div>
      <h1>Streaming example</h1>
      <h2>Critical data value: {criticalData}</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={nonCriticalData}>
          {(value) => <h3>Non critical value: {value}</h3>}
        </Await>
      </Suspense>
    </div>
  );
}
