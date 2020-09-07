import { Component } from '@angular/core';
import { ZoomService } from './zoom.service';
import { Recording } from './model/recording.model';
import { RecordingShow } from './model/recording-show.model';
import { Month } from './model/month.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  current_month: string;
  title = 'Arq. Computadores. Monitorias';

  displayedColumns: string[] = ['id', 'fecha_inicio', 'duracion', 'ver_grabacion'];
  dataSource: RecordingShow[];
  recordings: Recording[];

  constructor(private readonly zoomService: ZoomService) {

    this.getRecordingsByMonth(Month.CURRENT);
  }

  sortByDate(): void{
    this.dataSource = this.dataSource.sort((x, x2) => <any> new Date(x.fecha_inicio) - <any> new Date(x2.fecha_inicio)).reverse();
  }

  getRecordingsByMonth(monthToRetrieve: number){
    this.zoomService.getUserRecording(monthToRetrieve).subscribe(res => {
      this.recordings = res.meetings;
      this.dataSource = this.recordings.map(recordingToAdd => {
        const recordingToBeAdded: RecordingShow = {
          id: recordingToAdd.id,
          fecha_inicio: recordingToAdd.start_time,
          duracion: recordingToAdd.duration,
          ver_grabacion: recordingToAdd.share_url
        }
  
  
        return recordingToBeAdded;
  
      });
    
      this.sortByDate();
      });
      this.getCurrentMonth();
  }

  getNextMonthRecordings(): void{
this.getRecordingsByMonth(Month.NEXT);
  }

  getPreviousMonthRecordings(): void{
this.getRecordingsByMonth(Month.PREVIOUS);
  }

  getCurrentMonth(): void{
    this.current_month = this.zoomService.getCurrentMonth();
  }

}
