import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3002/api/songs", () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: 1, name: "Bohemian Rhapsody" },
        { id: 2, name: "Hotel California" },
      ],
      error: null,
    });
  }),

  http.delete("http://localhost:3002/api/songs/:id", () => {
    return HttpResponse.json({
      success: true,
      data: "Song deleted",
      error: null,
    });
  }),
];
