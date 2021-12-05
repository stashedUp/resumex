import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../../interfaces/alert';
import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: './alerts.directive.html',
    styleUrls: ['./alerts.directive.css'],
})

export class AlertsDirective {
    alerts: Alert[] = [];
    
        constructor(private alertService: AlertsService) { }
    
        ngOnInit() {
            this.alertService.getAlert().subscribe((alert: Alert) => {
                if (!alert) {
                    // clear alerts when an empty alert is received
                    this.alerts = [];
                    return;
                }
 
                // add alert to array
                this.alerts.push(alert);

                //auto remove alert
                setTimeout(() => this.removeAlert(alert), 5000);
            });
        }
    
        removeAlert(alert: Alert) {
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    
        cssClass(alert: Alert) {
            if (!alert) {
                return;
            }
    
            // return css class based on alert type
            switch (alert.type) {
                case AlertType.Success:
                    return 'alert alert-success';
                case AlertType.Error:
                    return 'alert alert-danger';
                case AlertType.Info:
                    return 'alert alert-info';
                case AlertType.Warning:
                    return 'alert alert-warning';
            }
        }
    }