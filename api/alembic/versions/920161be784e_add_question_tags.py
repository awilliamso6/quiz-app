"""add question tags

Revision ID: 920161be784e
Revises: 1466a21c505e
Create Date: 2024-07-01 11:36:26.929741

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '920161be784e'
down_revision: Union[str, None] = '1466a21c505e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('question', sa.Column('tag', sa.String(50)))
    op.alter_column('question', 'parent', type_=sa.String(50))


def downgrade() -> None:
    op.drop_column('question', 'tag')
    op.alter_column('question', 'parent', type_=sa.Uuid)
