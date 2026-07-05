export interface Match {
    $id?: string;
    team_a: string;
    team_b: string;
    target_songs: string[];
    team_a_start_streams: number;
    team_b_start_stream: number;
    stage: string;
    status: string;
    winner: string;
    team_a_current_streams?: number;
    team_b_current_streams?: number;
    target_streams_v2: number[];

    team_a_count?: number;
    team_b_count?: number;

    team_a_streams: number;
    team_b_streams: number;
}

export interface AlbumStat {
    $id?: string;
    album_name: string;
    total_members: number;
    status?: string;
}