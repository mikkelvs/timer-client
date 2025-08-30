This is a small client for displaying countdowns.

## Prerequisities

Ensure the API is running on http://localhost:3000

## Getting Started

Clone the repository and install dependencies, then build and run the client:

```bash
# install deps
npm install
# build and run
npm run build
npm run start
```

Open [http://localhost:8000](http://localhost:8000) to launch the site.

## Limitations / Considerations

- Limited error handling implemented
- Very basic styling
- No unit tests, Storybook
- Polling the API every 500 ms is probably not efficient at scale
- Similar useEffect logic could be extracted into custom hook
