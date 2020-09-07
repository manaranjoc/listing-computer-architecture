export interface RecordingFile {
    id?: string,
    meeting_id?: string,
    recording_start?: string,
    recording_end?: string,
    file_type?: string,
    file_size?: number,
    play_url?: string,
    download_url?: string,
    status?: string,
    recording_type?: string
}