export interface CreateReservation {
    seat: string;
    projectionId: string;
    seatNumber: number;
    seatRow: number;
    user?: string;
    movieName: string;
    moviePoster?: string;
}
