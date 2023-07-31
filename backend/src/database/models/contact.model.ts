import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
	tableName: 'contacts',
	underscored: true,
	timestamps: false,
})

export class Contact extends Model<Contact> {
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
	})
  id!: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userId!: number;

	@BelongsTo(() => User)
  user!: User;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	contactName!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	email!: string;
}