import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [DatePipe]
})
export class ContactComponent implements OnInit {
  listMessage: any;
  p: number = 1;
  selectedMessages: Set<number> = new Set<number>();
  aInstance:any;
  itemsPerPage: number = 8;
  user:any;
  avatar: any;

  constructor(
      private commonService: CommonService,
      private contactService: ContactService,
      private datePipe: DatePipe,
      private userService:UserService
    ) {}

  ngOnInit(): void {
    this.getAllMessage();
  }

  getAllMessage() {
    this.contactService.getAllContact().subscribe(data => {
      this.listMessage = data.map((item: { created_at: string | number | Date; }) => ({
        ...item,
        created_at: this.datePipe.transform(item.created_at, 'dd/MM/yyyy HH:mm:ss')
      }));
    });
  }

  detail(id:any, userId:any){
    this.contactService.getMessageById(id).subscribe((data) => {
      this.aInstance = data;
    });
    if (userId != null) {
      this.userService.getUserById(userId).subscribe(data => {
        this.user = data;
        this.avatar = this.user.avatar
      })
    }else{
      this.user = null;
    }
  }
deleteSelectedMessages() {
    const idsToDelete = Array.from(this.selectedMessages);
    this.contactService.deleteContacts(idsToDelete).subscribe(
      response => {
        this.commonService.showAlert("Selected messages deleted", "success");
        this.getAllMessage();
      },
      error => {
        this.commonService.showAlert("Deletion failed", "error");
      }
    );
  }
  toggleSelection(id: number) {
    if (this.selectedMessages.has(id)) {
      this.selectedMessages.delete(id);
    } else {
      this.selectedMessages.add(id);
    }
  }
}
