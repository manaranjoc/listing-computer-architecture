import { RecordingFile } from "./recording-file.model";

export interface Recording {
    uuid: string,
    id: number,
    account_id: string,
    host_id: string,
    topic: string,
    type: number,
    start_time: string,
    timezone: string,
    duration: number,
    total_size: number,
    recording_count: number,
    share_url: string,
    recording_files: RecordingFile[]
}