import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import { Project } from '../../shared/models/project.model';
import { getCurrentUserId } from '../../shared/utils/firebase.utils';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$: Observable<Project[]> = this.projectsSubject.asObservable();

  constructor() {
    this.initializeProjectListener();
  }

  private initializeProjectListener(): void {
    const userId = getCurrentUserId();
    if (!userId) return;

    firebase()
      .database()
      .ref('projects')
      .orderByChild('userId')
      .equalTo(userId)
      .on('value', snapshot => {
        const projects: Project[] = [];
        snapshot.forEach(child => {
          projects.push({
            ...child.val(),
            id: child.key
          });
          return false;
        });
        this.projectsSubject.next(projects);
      });
  }

  async createProject(title: string, description: string): Promise<string> {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User must be authenticated to create projects');
    }

    const project: Project = {
      title,
      description,
      createdAt: Date.now(),
      userId
    };

    const ref = await firebase().database().ref('projects').push(project);
    return ref.key;
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User must be authenticated to update projects');
    }

    await firebase().database().ref(`projects/${projectId}`).update(updates);
  }

  async deleteProject(projectId: string): Promise<void> {
    const userId = getCurrentUserId();
    if (!userId) {
      throw new Error('User must be authenticated to delete projects');
    }

    await firebase().database().ref(`projects/${projectId}`).remove();
  }
}