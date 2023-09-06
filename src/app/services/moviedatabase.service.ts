import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmResult, Result } from '../moviedatabaseresult';
import { lastValueFrom } from 'rxjs';
import { Credits } from '../cast';
import { Trailers } from '../trailer';
import { IMovieDetail } from '../moviedetail';
import { Images } from '../movieImage';

@Injectable({
  providedIn: 'root',
})
export class MoviedatabaseService {
  apiKey = '4bca0ed402b50b987ea6a5a881b9fe46';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmNhMGVkNDAyYjUwYjk4N2VhNmE1YTg4MWI5ZmU0NiIsInN1YiI6IjY0OTA4NTlmYzJmZjNkMDBhZDAzNDgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L6Rbf5tsZU4jICajKq156iIUfRViaGcarmIBKGxPNik';

  constructor(private http: HttpClient) {}

  searchFilm(title: string, releaseYear: number): Promise<Result> {
    return lastValueFrom(
      this.http.get<Result>(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${title}&year&=${releaseYear}`
      )
    );
  }

  getCredits(id: number): Promise<Credits> {
    return lastValueFrom(
      this.http.get<Credits>(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`
      )
    );
  }

  getTrailer(id: number): Promise<Trailers> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      Accept: 'application/json',
    });
    return lastValueFrom(
      this.http.get<Trailers>(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        { headers }
      )
    );
  }

  getDetail(id: number): Promise<IMovieDetail> {
    return lastValueFrom(
      this.http.get<IMovieDetail>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`
      )
    );
  }

  getImages(id: number): Promise<Images> {
    return lastValueFrom(
      this.http.get<Images>(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`
      )
    );
  }
}
