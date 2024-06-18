"""create results table

Revision ID: 1466a21c505e
Revises: e039e450ad9f
Create Date: 2024-06-11 16:42:39.729719

"""
from typing import Sequence, Union
import uuid

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1466a21c505e'
down_revision: Union[str, None] = 'e039e450ad9f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column('question', 'question_id', new_column_name='id')
    op.create_table(
        'results',
        sa.Column('id', sa.Uuid, primary_key=True, default=uuid.uuid4),
        sa.Column('name_a', sa.String(50), nullable=True),
        sa.Column('pronoun_a', sa.String(10), nullable=True),
        sa.Column('result_a', sa.String(200), nullable=True),
        sa.Column('name_b', sa.String(50), nullable=True),
        sa.Column('pronoun_b', sa.String(10), nullable=True),
        sa.Column('result_b', sa.String(200), nullable=True),
        sa.Column('timestamp', sa.DateTime, nullable=True)
    )


def downgrade() -> None:
    op.alter_column('question', 'id', new_column_name='question_id')
    op.drop_table('results')
