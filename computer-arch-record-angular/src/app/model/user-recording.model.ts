import { Recording } from "./recording.model";

export interface UserRecording{
    from: string,
    to: string,
    page_count: number,
    page_size: number,
    total_records: number,
    next_page_token: string,
    meetings: Recording[]
}