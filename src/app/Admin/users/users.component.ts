import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  page: number = 1;
  itemsPerPage: number = 8;
  listUsers: User [] = [];
  originalListUsers: User [] = [];
  user: User = {
    id: undefined,
    fullname: undefined,
    phone_number: undefined,
    email: undefined,
    avatar: undefined,
    address: undefined,
    password: undefined,
    created_at: undefined,
    updated_at: undefined,
    is_active: undefined,
    date_of_birth: undefined,
    role_id: undefined
  };
  roles: any;
  logId: any;
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe((data) => {
      this.getLogId();
      this.listUsers = data.filter(
        (user: { id: any }) => user.id !== this.logId
      );
      this.originalListUsers = data;
      this.getAllRole();
    });
  }

  getLogId() {
    this.logId = this.authService.getUserId();
  }

  filterByName(nameInput: HTMLInputElement) {
    const inputValue = nameInput.value.toLowerCase();
    if (inputValue) {
      this.listUsers = this.originalListUsers.filter(
        (user: { fullname: string }) =>
          user.fullname.toLowerCase().includes(inputValue)
      );
    } else {
      this.listUsers = this.originalListUsers;
    }
  }
  changeStatusUser(id: any) {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.user = data;

        this.user.is_active = this.user.is_active == 1 ? 0 : 1;

        this.userService.editUser(id, this.user).subscribe(
          (response) => {
            this.commonService.showAlert(
              'Change status successfully!!',
              'success'
            );
            this.getAllUsers();
          },
          (error) => {
            this.commonService.showAlert('Change status failed!!', 'danger');
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAllRole() {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }
  onRoleChange(event: Event, userId: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRoleId = parseInt(selectElement.value, 10);

    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
      this.user.role_id = selectedRoleId;

      this.userService.editUser(userId, this.user).subscribe(
        (response) => {
          this.commonService.showAlert('Change role successfully', 'success');
        },
        (error) => {
          console.error(error);
          this.commonService.showAlert('Failed to change role', 'error');
        }
      );
    });
  }
  deleteUser(id: any) {
    this.commonService.confirmAlert();
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.commonService.showAlerAside(
          'Delete user successfully!!',
          'success'
        );
      },
      (error) => {
        console.error(error);
        this.commonService.showAlerAside('Failed to delete user!!', 'error');
      }
    );
  }
}
