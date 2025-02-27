import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ComicsCarousel from "../components/ComicList";
import { fetchComicsByCharacterId } from "../actions/characterActions";

jest.mock("../actions/characterActions", () => ({
    fetchComicsByCharacterId: jest.fn(() => Promise.resolve({ data: { results: [] } })),
  }));
  

// Cliente de React Query
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("ComicsCarousel Component", () => {
    it("should show loading state when data is undefined", () => {
        render(
          <QueryClientProvider client={createQueryClient()}>
            <ComicsCarousel characterId="123" />
          </QueryClientProvider>
        );
    
        // Verificar que el loader se renderiza correctamente
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

  it("should render comics when data is available", async () => {
    // Simular respuesta de la API
    (fetchComicsByCharacterId as jest.Mock).mockResolvedValue({
      data: {
        results: [
          {
            id: 1,
            title: "Amazing Spider-Man #1",
            thumbnail: {
              path: "https://example.com/spiderman",
              extension: "jpg",
            },
            modified: "2023-01-01T00:00:00Z",
          },
          {
            id: 2,
            title: "Iron Man #1",
            thumbnail: {
              path: "https://example.com/ironman",
              extension: "jpg",
            },
            modified: "2022-05-20T00:00:00Z",
          },
        ],
      },
    });

    render(
      <QueryClientProvider client={createQueryClient()}>
        <ComicsCarousel characterId="123" />
      </QueryClientProvider>
    );

    // Esperar a que se rendericen los cómics
    expect(await screen.findByText("Amazing Spider-Man #1")).toBeInTheDocument();
    expect(await screen.findByText("Iron Man #1")).toBeInTheDocument();

    // Verificar que se muestren las imágenes
    expect(screen.getByAltText("Amazing Spider-Man #1")).toHaveAttribute(
      "src",
      "https://example.com/spiderman/portrait_xlarge.jpg"
    );

    expect(screen.getByAltText("Iron Man #1")).toHaveAttribute(
      "src",
      "https://example.com/ironman/portrait_xlarge.jpg"
    );

    // Verificar que se muestra el año de modificación
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  it("should display 'Imagen no disponible' if no thumbnail exists", async () => {
    (fetchComicsByCharacterId as jest.Mock).mockResolvedValue({
      data: {
        results: [
          {
            id: 3,
            title: "Comic sin imagen",
            thumbnail: null,
            modified: null,
          },
        ],
      },
    });

    render(
      <QueryClientProvider client={createQueryClient()}>
        <ComicsCarousel characterId="123" />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Comic sin imagen")).toBeInTheDocument();
    expect(await screen.findByText("Imagen no disponible")).toBeInTheDocument();
    expect(await screen.findByText("Fecha desconocida")).toBeInTheDocument();
  });
});
