import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
//Captures current value and validation of from, tracks changes
import { FormsModule} from '@angular/forms';
import { ChatService } from 'src/app/chat.service';

@NgModule({
  declarations: [ChatDialogComponent],
  imports: [
    CommonModule,
    //Exports required providers and directives for template-driven froms
    //imports by NgModules 
    FormsModule
  ],
  exports: [ ChatDialogComponent ],
  providers: [ChatService]
})
export class ChatModule { }
