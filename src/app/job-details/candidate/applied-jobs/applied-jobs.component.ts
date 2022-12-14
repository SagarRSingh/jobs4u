import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICandidate } from 'src/app/Models/candidate.interface';
import { IJob } from 'src/app/Models/job.interface';
import { CandidatesService } from 'src/app/Services/candidates/candidates.service';
import { JobsServices } from 'src/app/Services/Jobs/jobs.service';
import { PostedJobDialog } from '../../company/posted-jobs/complete-description/completeDescription.dialog';


@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  userDataBySubject: ICandidate = {
    id: 0,
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    bio: '',
    location: 'undefined',
    education: '',
    email: '',
    dob: '',
    resume: undefined,
    contactNumber: 0,
    appliedJobs: []
  };

  jobData: IJob[] = [] ;

  constructor(private _candidate: CandidatesService, private _jobs:JobsServices, private dialog:MatDialog) { }

  ngOnInit(): void {
    this._candidate.candidateIDsubject$.subscribe((data) => {
      this._candidate.getCandidatesDatabyAPI().subscribe((candidateData) => {
        this.userDataBySubject = candidateData.find(x => x.email == data)!;
        console.log(this.userDataBySubject);
      })
    })

    this._jobs.getJobList().subscribe((list) => {
      this.jobData = list.filter(x=> this.userDataBySubject.appliedJobs.includes(x.id));
      console.log(this.jobData);
      
    })

  }

  details(jobName:string, companyName:string, city:string, country:string, category:string, salary:string, validThrough:string){
    this.dialog.open(PostedJobDialog, {
      data: {
        jobName: jobName,
        companyName: companyName,
        city: city,
        country: country,
        category: category,
        salary:salary,
        validThrough: validThrough
      }
    });
  }
}
