import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GraphPage } from '../pages/graph/graph';
import { TabsPage } from '../pages/tabs/tabs';

import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { GeneralService } from '../services/general.service';
import { FormulaService } from '../services/formula.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GraphPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GraphPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqlStorageProvider,
    GeneralService,
    FormulaService
  ]
})
export class AppModule {}
