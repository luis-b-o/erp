import { RepositoryPort } from '@/libs/ports';
import { UserEntity } from '@/modules/user/domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {}
