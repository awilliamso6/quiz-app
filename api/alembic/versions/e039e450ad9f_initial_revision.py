"""initial revision

Revision ID: e039e450ad9f
Revises: 
Create Date: 2024-06-07 18:49:09.474853

"""
from typing import Sequence, Union
import uuid

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e039e450ad9f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'question',
        sa.Column('question_id', sa.Uuid, primary_key=True, default=uuid.uuid4),
        sa.Column('text', sa.String(100), nullable=False),
        sa.Column('answers', sa.String(100), nullable=False),
        sa.Column('parent', sa.Uuid, nullable=True),
        sa.Column('category', sa.String(50), nullable=False)
    )


def downgrade() -> None:
    pass
