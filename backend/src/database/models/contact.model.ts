import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
	tableName: 'contacts',
	underscored: true,
	timestamps: false,
})

export class Contact extends Model<Contact> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userId!: number;

	@BelongsTo(() => User, 'id')
  user!: User;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	contactId!: number;
}