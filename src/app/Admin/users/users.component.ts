import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  p:number = 1;
  itemsPerPage:number = 8;
  listUsers: any;
  originalListUsers: any; 
  user:any;
  roles:any;
  logId:any;
  constructor(
    private userService: UserService, 
    private commonService:CommonService,
    private roleService:RoleService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe((data) => {
      this.getLogId();
      this.listUsers = data.filter((user: { id: any; }) => user.id !== this.logId);
      this.originalListUsers = data;
      this.getAllRole();
    });
  }
  
  getLogId() {
    this.logId = this.authService.getUserId();
  }
  
  filterBy(nameInput: HTMLInputElement) {
    const inputValue = nameInput.value.toLowerCase(); 
    if (inputValue) {
      this.listUsers = this.originalListUsers.filter((user: { fullname: string; }) => 
        user.fullname.toLowerCase().includes(inputValue) 
      );
    } else {
      this.listUsers = this.originalListUsers;
    }
  }
  changeStatusUser(id: any) {
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
      
      this.user.is_active = this.user.is_active == 1 ? 0 : 1;
  
      this.userService.edit(id, this.user).subscribe(response => {
        this.commonService.showAlert("Change status successfully!!", "success")
        this.getAllUsers()
      }, error => {
        this.commonService.showAlert("Change status failed!!", "danger")
      });
    }, error => {
      console.error('Error fetching user details:', error);
    });
  }
  getAllRole(){
    this.roleService.getAllRoles().subscribe( (roles: Role[]) => {
       this.roles = roles;
    })
  }
  onRoleChange(event: Event, userId: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRoleId   = parseInt(selectElement.value, 10);
    
    this.userService.getUserById(userId).subscribe(user => {
      this.user = user;
      this.user.role_id = selectedRoleId;

      this.userService.edit(userId, this.user).subscribe(response => {
        this.commonService.showAlert("Change role successfully", "success");
      }, error => {
        console.error('Error updating user role', error);
        this.commonService.showAlert("Failed to change role", "error");
      });
    });
  }
  deleteUser(id:any){
    this.commonService.confirmAlert()
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.commonService.showAlerAside("Delete user successfully!!", "success");
      },
      error => {
        console.error('Failed to delete user:', error);
        this.commonService.showAlerAside("Failed to delete user!!", "error");
      }
  )}

  
}
