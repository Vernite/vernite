import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import * as UAParser from 'ua-parser-js';
import { UserSession } from '../../interfaces/session.interface';
import { SessionsService } from '../../services/sessions.service';

@Component({
  selector: 'app-settings-sessions',
  templateUrl: './settings-sessions.page.html',
  styleUrls: ['./settings-sessions.page.scss'],
})
export class SettingsSessionsPage implements OnInit {
  public sessionsList$!: Observable<UserSession[]>;

  constructor(private sessionService: SessionsService) {}
  ngOnInit() {
    this.sessionsList$ = this.sessionService.list();
  }

  changeDate(date: number) {
    let currentDate = dayjs();
    let sessionDate = dayjs(date);

    if (currentDate.year() != sessionDate.year()) {
      if (currentDate.diff(sessionDate, 'month') > 0) {
        return sessionDate.format('LL');
      } else {
        return sessionDate.format('LLL');
      }
    } else {
      return sessionDate.format('MMMM D, h:mm A');
    }
  }

  agentType(type: string, agent: string) {
    let uaParser = new UAParser(agent);
    let osName = uaParser.getOS().name || 'Unknown system';
    let browser = uaParser.getBrowser().name || 'Unknown browser';
    if (type == 'os') {
      return osName;
    }
    if (type == 'browser') {
      return browser;
    }
    return osName + ', ' + browser;
  }

  location(geoip: UserSession['geoip']) {
    let location = '';
    if (geoip.city) {
      location += geoip.city;
    }
    if (geoip.country) {
      if (location) location += ', ';
      location += geoip.country;
    }
    return location;
  }

  deleteSession(id: number) {
    this.sessionService.delete(id).subscribe();
  }
}
